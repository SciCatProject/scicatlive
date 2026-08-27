# Copyright (c) 2025, SciCat Project
# ruff: noqa: INP001,D100

from os import environ
from os import path as ospath
from pathlib import Path
from urllib.parse import urljoin, urlsplit, urlunsplit

from bs4 import BeautifulSoup
from mkdocs.config.defaults import MkDocsConfig
from mkdocs.structure.files import Files
from mkdocs.structure.pages import Page


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
    soup = BeautifulSoup(html, "lxml")
    docs = files.documentation_pages()
    page_path = Path(page.url)
    for element in soup.find_all(href=True):
        scheme, netloc, path, query, fragment = urlsplit(element["href"])
        if scheme or netloc:  # External link
            continue

        resolved_path = Path(ospath.normpath(page_path / path))
        if not path or any(
            filter(lambda x: Path(x.src_uri.strip(doc_file)) == resolved_path, docs),
        ):  # Self-link containing only query or anchor, or exiting md
            continue
        relative_path = urlunsplit(
            (scheme, netloc, str(resolved_path), query, fragment),
        )

        # In the official published site (built in CI) this resolves to the
        # real file. Locally, docs from multiple repos are aggregated under
        # one docs_dir, so which upstream repo a link like this really
        # belongs to can't be reliably determined - point at an explanation
        # of the rule instead of guessing (possibly wrong) resolved paths.
        is_ci = "GITHUB_SERVER_URL" in environ
        url = urljoin(repo_url, relative_path) if is_ci else "/external-links/"
        element["href"] = url

    return soup.prettify()
