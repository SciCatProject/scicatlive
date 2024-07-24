from os import environ, path as ospath
from urllib.parse import urljoin, urlsplit, urlunsplit
from bs4 import BeautifulSoup
from pathlib import Path
from requests import get

def on_page_content(html, page, config, files):
    repo_url = f"{config.repo_url}/blob/{environ.get('TAG', 'main')}/"
    doc_file = 'README.md'
    check_links = environ.get('DOCS_LINK_CHECK')
    soup = BeautifulSoup(html, 'lxml')
    docs = files.documentation_pages()
    page_path = Path(page.url)
    for element in soup.find_all(href=True):
        base_url = repo_url
        replace_href = False
        scheme, netloc, path, query, fragment = urlsplit(element['href'])
        resolved_path = Path(ospath.normpath(page_path / path))
        if scheme or netloc: # External link
            base_url = ''
        elif not path: # Self-link containing only query or anchor.
            resolved_path = resolved_path / doc_file
        elif any(filter(lambda x: Path(x.src_uri.strip(doc_file)) == resolved_path, docs)): # Exiting docs
            resolved_path = resolved_path / doc_file
        else:
            replace_href = True
        relative_path = urlunsplit((scheme, netloc, str(resolved_path), query, fragment))
        url = urljoin(base_url, relative_path)
        if check_links: get(url).raise_for_status()
        if replace_href: element['href'] = url
    return soup.prettify()
