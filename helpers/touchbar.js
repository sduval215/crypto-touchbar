const { TouchBar, nativeImage } = require('electron');
const { TouchBarButton, TouchBarSpacer } = TouchBar;

const getIcon = (label = 'bitcoin', height = 16, width = 14) => {
   return nativeImage.createFromPath(`./imgs/${label}-logo.png`).resize({height, width});
};

const spacer = new TouchBarSpacer({ size: 'small '});

const baseTouchBar = {
  label: `Loading...`,
  iconPosition: 'left',
  click: () => null
}

let touchBarArray = [
  new TouchBarButton({
    backgroundColor: '#F18F19',
    icon: getIcon('bitcoin'),
    ...baseTouchBar
  }),
  spacer, // spacer element
  new TouchBarButton({
    backgroundColor: '#4C60B3',
    icon: getIcon('bitcoin'),
    ...baseTouchBar
  }),
  spacer, // spacer element
  new TouchBarButton({
    backgroundColor: '#87898A',
    icon: getIcon('bitcoin'),
    ...baseTouchBar
  }),
]


module.exports = {
  touchBarArray
}
