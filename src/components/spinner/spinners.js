export default [{
  name: 'ios',
  duration: 1000,
  lines: 12,
  fn: function (duration, index, total) {
    return {
      y1: 17,
      y2: 29,
      style: {
        transform: 'rotate(' + (30 * index + (index < 6 ? 180 : -180)) + 'deg)',
        animationDelay: -(duration - ((duration / total) * index)) + 'ms'
      }
    }
  }
}, {
  name: 'ios-small',
  duration: 1000,
  lines: 12,
  fn: function (duration, index, total) {
    return {
      y1: 12,
      y2: 20,
      style: {
        transform: 'rotate(' + (30 * index + (index < 6 ? 180 : -180)) + 'deg)',
        animationDelay: -(duration - ((duration / total) * index)) + 'ms'
      }
    }
  }
}, {
  name: 'bubbles',
  duration: 1000,
  circles: 9,
  fn: function (duration, index, total) {
    return {
      r: 5,
      style: {
        top: 9 * Math.sin(2 * Math.PI * index / total),
        left: 9 * Math.cos(2 * Math.PI * index / total),
        animationDelay: -(duration - ((duration / total) * index)) + 'ms'
      }
    }
  }
}, {
  name: 'circles',
  duration: 1000,
  circles: 8,
  fn: function (duration, index, total) {
    return {
      r: 5,
      style: {
        top: 9 * Math.sin(2 * Math.PI * index / total),
        left: 9 * Math.cos(2 * Math.PI * index / total),
        animationDelay: -(duration - ((duration / total) * index)) + 'ms'
      }
    }
  }
}, {
  name: 'crescent',
  duration: 750,
  circles: 1,
  fn: function (duration) {
    return {
      r: 26,
      style: {}
    }
  }
}, {
  name: 'dots',
  duration: 750,
  circles: 3,
  fn: function (duration, index, total) {
    return {
      r: 6,
      style: {
        left: (9 - (9 * index)),
        animationDelay: -(110 * index) + 'ms'
      }
    }
  }
}, {
  name: 'wave',
  duration: 1000,
  lines: 8,
  fn: function (duration, index, total) {
    return {
      y1: 0,
      y2: 64,
      style: {
        left: (index / (total - 1) - 0.5) * 100 + '%',
        animationDelay: -(duration - ((duration / total) * index)) + 'ms'
      }
    }
  }
}]
