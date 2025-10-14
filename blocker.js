function removeAdsElements() {
  const domain = window.location.hostname

  if (domain.includes('komiinform.ru')) {
    let header = document.querySelector('#header')
    const leftAdvs = document.querySelectorAll('.left-adv')
    const msngr = document.querySelector('.mainContent .text-right + p')

    if (header) {
      header.style.display = 'none'
    }

    leftAdvs.forEach((elem) => {
      elem.style.display = 'none'
    })

    if (msngr) {
      msngr.style.display = 'none'
    }
  }

  if (domain.includes('pg11.ru')) {
    const topBanner = document.querySelector('#__next > div + div > div')

    if (topBanner) {
      topBanner.style.display = 'none'
    }
  }

  if (domain.includes('komionline.ru')) {
    const advSideLeft = document.querySelector('.adv-side-left')
    const advSideRight = document.querySelector('.adv-side-right')
    const advRows = document.querySelectorAll('.adv-row')
    const advBlocks = document.querySelectorAll('.adv')
    const slinks = document.querySelector('#slinksBlock')
    const links = document.querySelector('.sape-links')

    if (advSideLeft) {
      advSideLeft.style.display = 'none'
    }

    if (advSideRight) {
      advSideRight.style.display = 'none'
    }

    advRows.forEach((row) => {
      row.style.display = 'none'
    })

    advBlocks.forEach((block) => {
      block.style.display = 'none'
    })

    if (slinks) {
      slinks.style.display = 'none'
    }

    if (links) {
      links.style.display = 'none'
    }
  }
}

removeAdsElements()
