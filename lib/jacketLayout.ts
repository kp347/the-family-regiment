// lib/jacketLayout.ts

export const jacketLayout = {
  front: {
    crest: {
      leftChest: {
        left: "63%",
        top: "38%",
        width: 58,
        height: 70,
      },

      rightChest: {
        left: "31%",
        top: "38%",
        width: 58,
        height: 70,
      },
    },

    nameTape: {
      // opposite LEFT crest
      leftChest: {
        left: "23%",
        top: "34%",
      },

      // opposite RIGHT crest
      rightChest: {
        left: "63%",
        top: "34%",
      },
    },

    sleevePatch: {
      left: "9%",
      top: "21%",
      size: 44,
    },
  },

  back: {
    topRocker: {
      left: "50%",
      top: "16%",
      width: 88,
      height: 20,
    },

    centerPatch: {
      left: "50%",
      top: "21%",
      width: 48,
      height: 52,
    },

    bottomRocker: {
      left: "50%",
      top: "26%",
      width: 92,
      height: 20,
    },
  },
} as const;