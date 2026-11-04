// Original, lightweight SVG emblems for Spider Stats' rank guide.
(() => {
  const colors = ['#aeb6c2', '#c9855f', '#d3dce5', '#f2c55d', '#67d8bd', '#72bfff', '#8edba0', '#ff6170', '#ffe6a0'];
  const glyphs = [
    '<path d="M36 34h28v8H36zm-7 15h42v8H29zm5 15h32v8H34z"/>',
    '<path d="M50 27 70 62H30z"/><circle cx="50" cy="69" r="5"/>',
    '<path d="m50 26 22 24-22 24-22-24z"/><path d="M50 34v32" stroke="#101116" stroke-width="4"/>',
    '<path d="m50 24 6 18 18 2-14 12 4 18-14-10-14 10 4-18-14-12 18-2z"/>',
    '<path d="M50 25 72 38v25L50 76 28 63V38z"/><path d="m50 35 13 8v15l-13 8-13-8V43z" fill="#101116"/>',
    '<path d="m50 25 24 25-24 25-24-25z"/><path d="m50 37 12 13-12 13-12-13z" fill="#101116"/>',
    '<path d="m50 24 24 16-9 31H35l-9-31z"/><path d="m50 37 13 10-5 16H42l-5-16z" fill="#101116"/>',
    '<path d="M50 22 67 43 58 75H42l-9-32z"/><path d="m50 34 8 13-8 15-8-15z" fill="#101116"/>',
    '<path d="m50 19 6 19 18-11-11 18 19 5-19 6 11 18-18-11-6 19-6-19-18 11 11-18-19-6 19-5-11-18 18 11z"/><circle cx="50" cy="50" r="8" fill="#101116"/>'
  ];

  window.rankCard = (rank, index) => {
    const color = colors[index];
    const divisions = index === 8 ? '<span>LEADERBOARD</span>' : '<span>I</span><span>II</span><span>III</span>';
    const description = index === 8
      ? 'Radiant is the regional leaderboard rank. Its cutoff varies by region and Act.'
      : 'Climb through divisions I, II, and III. Check your in-game Competitive screen for your exact RR.';
    return `<details class="rank-card" style="--rank-color:${color}"><summary><span class="rank-card-art"><svg viewBox="0 0 100 100" role="img" aria-label="Original Spider Stats ${rank} guide emblem"><defs><linearGradient id="rank-${index}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${color}"/><stop offset="1" stop-color="#fff" stop-opacity=".3"/></linearGradient></defs><path d="M50 5 86 26 79 72 50 95 21 72 14 26Z" fill="#14161d" stroke="url(#rank-${index})" stroke-width="3"/><path d="M50 14 77 30 71 68 50 84 29 68 23 30Z" fill="url(#rank-${index})" opacity=".94"/>${glyphs[index]}<path d="M50 14v70" stroke="#fff" stroke-opacity=".18"/></svg></span><span class="rank-card-heading"><b>${rank}</b><small>${index === 8 ? 'Top 500' : '3 divisions'}</small></span><span class="rank-expand" aria-hidden="true">+</span></summary><div class="rank-card-info"><div class="rank-tier-list">${divisions}</div><p>${description}</p></div></details>`;
  };
})();
