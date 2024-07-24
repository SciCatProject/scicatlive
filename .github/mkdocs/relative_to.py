# ruff: noqa: INP001,D100

from os import environ
from os import path as ospath
from pathlib import Path
from urllib.parse import urljoin, urlsplit, urlunsplit

from bs4 import BeautifulSoup
from mkdocs.config.defaults import MkDocsConfig
from mkdocs.structure.files import Files
from mkdocs.structure.pages import Page
from requests import get


def on_page_content(html: str, page: Page, config: MkDocsConfig, files: Files) -> str:
    """Process HTML content to resolve internal links, optionally check their validity.

    This function modifies the `href` attributes of internal non `.md` links
    elements in the given HTML content to point to the correct locations within
    the documentation or the repository. It also optionally checks the validity
    of these links by making HTTP requests to ensure they are accessible.

    Args:
    ----
        html (str): The HTML content of the page.
        page (Page): The page object representing the current documentation page.
        config (MkDocsConfig): The MkDocs configuration object.
        files (Files): The collection of files in the documentation site.

    Returns:
    -------
        str: The modified HTML content with updated links.

    """
    repo_url = f"{config.repo_url}/blob/{environ.get('TAG', 'main')}/"
    doc_file = "README.md"
    check_links = environ.get("DOCS_LINK_CHECK")
    soup = BeautifulSoup(html, "lxml")
    docs = files.documentation_pages()
    page_path = Path(page.url)
    for element in soup.find_all(href=True):
        base_url = repo_url
        replace_href = False
        scheme, netloc, path, query, fragment = urlsplit(element["href"])
        resolved_path = Path(ospath.normpath(page_path / path))
        if scheme or netloc:  # External link
            base_url = ""
        elif not path or any(
            filter(lambda x: Path(x.src_uri.strip(doc_file)) == resolved_path, docs),
        ):  # Self-link containing only query or anchor, or exiting md
            resolved_path = resolved_path / doc_file
        else:
            replace_href = True
        relative_path = urlunsplit(
            (scheme, netloc, str(resolved_path), query, fragment),
        )
        url = urljoin(base_url, relative_path)
        if check_links:
            get(url, timeout=30).raise_for_status()
        if replace_href:
            element["href"] = url
    return soup.prettify()
