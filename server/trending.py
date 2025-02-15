from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException, TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import time
import shutil

# Automatically find Chromedriver
CHROMEDRIVER_PATH = shutil.which("chromedriver")  # Finds the correct path

if not CHROMEDRIVER_PATH:
    raise FileNotFoundError("❌ Chromedriver not found! Install it with `brew install chromedriver` or download it manually.")

# Set up Chrome options
options = Options()
options.add_argument("--headless")  # Run without opening a browser
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")

# Initialize Selenium WebDriver
service = Service(CHROMEDRIVER_PATH)
driver = webdriver.Chrome(service=service, options=options)

try:
    driver.get("https://www.regulations.gov")  # Load the page

    # Wait for the main content to load
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "ul.card-secondary-group li"))
    )

    # Get the fully rendered page source
    html = driver.page_source
    soup = BeautifulSoup(html, "html.parser")

    # Scrape trending documents
    documents = []
    for li in soup.select("ul.card-secondary-group li"):
        try:
            title = li.select_one("h3.h4").get_text(strip=True) if li.select_one("h3.h4") else "No Title"
            link = li.select_one("a")["href"] if li.select_one("a") else "#"

            documents.append({
                "title": title,
                "link": f"https://www.regulations.gov{link}"
            })
        except Exception as e:
            print(f"⚠️ Error parsing an item: {e}")

    print("✅ Scraped Documents:", documents)

except TimeoutException:
    print("❌ Timeout: The page took too long to load!")
except Exception as e:
    print(f"❌ Error: {e}")

finally:
    driver.quit()  # Always close the browser
