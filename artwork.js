(() => {
  let catalog = { agents: {}, maps: {} };
  const safeAsset = value => {
    try {
      const url = new URL(value, location.href);
      return url.origin === location.origin && url.pathname.startsWith(new URL('./', location.href).pathname) ? url.href : '';
    } catch { return ''; }
  };
  const setImage = (image, value) => {
    const url = safeAsset(value);
    if (!url || image.dataset.loadedAsset === url) return;
    image.dataset.loadedAsset = url;
    image.src = url;
    image.addEventListener('error', () => { image.hidden = true; }, { once: true });
  };
  const addImage = (parent, className, alt) => {
    const image = document.createElement('img');
    image.className = className;
    image.alt = alt;
    image.loading = 'lazy';
    image.decoding = 'async';
    parent.append(image);
    return image;
  };

  function decorate() {
    document.querySelectorAll('.agent-card[data-agent]').forEach(card => {
      const name = card.dataset.agent;
      let frame = card.querySelector('.agent-art');
      if (!frame) {
        const emblem = card.querySelector('.agent-emblem');
        if (!emblem) return;
        frame = document.createElement('span');
        frame.className = 'agent-art';
        emblem.before(frame);
        frame.append(emblem);
      }
      let image = frame.querySelector('img');
      if (!image) image = addImage(frame, 'agent-card-portrait', name + ' character portrait');
      setImage(image, catalog.agents[name]?.portrait);
    });

    document.querySelectorAll('.map-card[data-map]').forEach(card => {
      const name = card.dataset.map;
      let image = card.querySelector('.map-card-art');
      if (!image) image = addImage(card, 'map-card-art', name + ' map artwork');
      setImage(image, catalog.maps[name]?.splash);
    });

    const agentDetail = document.querySelector('#agentDetail');
    const agentTitle = agentDetail?.querySelector('.profile-top .section-title');
    if (agentTitle) {
      const name = agentTitle.textContent.trim();
      let hero = agentDetail.querySelector('.agent-profile-art');
      if (!hero) {
        hero = document.createElement('div');
        hero.className = 'agent-profile-art';
        agentDetail.querySelector('.profile-top').before(hero);
      }
      let portrait = hero.querySelector('.agent-profile-portrait');
      if (!portrait) portrait = addImage(hero, 'agent-profile-portrait', name + ' character portrait');
      setImage(portrait, catalog.agents[name]?.portrait);

      agentDetail.querySelectorAll('.ability-card').forEach(card => {
        const ability = card.querySelector('h4')?.textContent.trim();
        if (!ability) return;
        let frame = card.querySelector('.ability-art');
        if (!frame) {
          frame = document.createElement('span');
          frame.className = 'ability-art';
          card.prepend(frame);
        }
        let image = frame.querySelector('img');
        if (!image) image = addImage(frame, 'ability-image', name + ' ' + ability + ' icon');
        setImage(image, catalog.agents[name]?.abilities?.[ability]);
      });
    }

    const mapDetail = document.querySelector('#mapDetail');
    const mapTitle = mapDetail?.querySelector('.profile-top .section-title');
    if (mapTitle) {
      const name = mapTitle.textContent.trim();
      let hero = mapDetail.querySelector('.map-art-hero');
      if (!hero) {
        hero = document.createElement('div');
        hero.className = 'map-art-hero';
        mapDetail.querySelector('.profile-top').before(hero);
      }
      let landscape = hero.querySelector('.map-art-landscape');
      if (!landscape) landscape = addImage(hero, 'map-art-landscape', name + ' map artwork');
      setImage(landscape, catalog.maps[name]?.splash);
      let minimap = hero.querySelector('.map-art-minimap');
      if (!minimap) minimap = addImage(hero, 'map-art-minimap', name + ' minimap');
      setImage(minimap, catalog.maps[name]?.minimap);
    }
  }

  new MutationObserver(decorate).observe(document.querySelector('#pageContent') || document.body, { childList: true, subtree: true });
  decorate();
  fetch('./artwork-manifest.json').then(response => response.ok ? response.json() : null).then(data => {
    if (data) { catalog = data; window.spiderArtworkManifest = data; }
    decorate();
  }).catch(() => { /* Local placeholders stay visible when the artwork manifest is unavailable. */ });
})();
