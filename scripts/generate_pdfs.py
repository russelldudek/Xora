from __future__ import annotations
import base64
import mimetypes
import re
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
ROUTES = {
    "resume.html": "Russell-Dudek-4MP-Resume.pdf",
    "cover-letter.html": "Russell-Dudek-4MP-Cover-Letter.pdf",
    "interview-brief.html": "Russell-Dudek-4MP-Interview-Thesis-Brief.pdf",
    "120-day-plan.html": "Russell-Dudek-4MP-120-Day-Plan.pdf",
    "correction-qualification.html": "Russell-Dudek-4MP-Correction-Qualification.pdf",
}

def data_uri(path: Path) -> str:
    mime = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    return f"data:{mime};base64,{base64.b64encode(path.read_bytes()).decode()}"

def assemble(route: str) -> str:
    html = (ROOT / route).read_text()
    token_css = (ROOT / "brand-tokens.css").read_text()
    doc_css = (ROOT / "document.css").read_text().replace("@import url('brand-tokens.css');", "")
    html = re.sub(r'<link rel="stylesheet" href="brand-tokens.css">', f"<style>{token_css}</style>", html)
    html = re.sub(r'<link rel="stylesheet" href="document.css">', f"<style>{doc_css}</style>", html)
    for rel in ["assets/brand/4mp-logo.webp", "assets/brand/4mp-autonomous-correction-part.webp"]:
        html = html.replace(rel, data_uri(ROOT / rel))
    return html

def main() -> None:
    DOCS.mkdir(exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, executable_path="/usr/bin/chromium", args=["--no-sandbox", "--disable-web-security"])
        page = browser.new_page(viewport={"width": 1280, "height": 900})
        for route, filename in ROUTES.items():
            page.set_content(assemble(route), wait_until="load")
            page.emulate_media(media="print")
            page.evaluate("document.fonts && document.fonts.ready")
            output = DOCS / filename
            page.pdf(path=str(output), format="Letter", print_background=True, prefer_css_page_size=True, margin={"top":"0","right":"0","bottom":"0","left":"0"})
            print(f"generated {output.name}")
        browser.close()

if __name__ == "__main__":
    main()
