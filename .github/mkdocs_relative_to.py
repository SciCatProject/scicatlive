from os import environ, path as ospath
from urllib.parse import urljoin, urlsplit
from bs4 import BeautifulSoup
from pathlib import Path

def on_page_content(html, page, config, files):
    soup = BeautifulSoup(html, 'lxml')
    docs = files.documentation_pages()
    page_path = Path(page.url)
    for element in soup.find_all(href=True):
        scheme, netloc, path, _, _ = urlsplit(element['href'])
        if scheme or netloc: # External link
            continue
        if not path: # Self-link containing only query or anchor.
            continue
        resolved_path = Path(ospath.normpath(page_path / path))
        if any(filter(lambda x: Path(x.src_uri.strip('README.md')) == resolved_path, docs)): # Exiting docs
            continue
        element['href'] = urljoin(f"{environ['BASE_URL']}/", ospath.normpath(page_path / element['href']))
    return soup.prettify()
