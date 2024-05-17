import { create } from "zustand";

import { immer } from "zustand/middleware/immer";

type CampaignType = {
  key: string;
  dateCreated: string;
  duration: number;
  games: any[];
  // games: {
  //   id: string;
  // }[];
  id: string;
  name: string;
  numOfAttempts: number;
  passScore: number;
};

export interface UpdateCampaignType {
  campaign: CampaignType;
  isUpdateMode: boolean;
}

type UpdateCampaignState = {
  campaignData: UpdateCampaignType;

  setCampaignData: (campaingData: string) => void;
  resetUpdateMode: () => void;
  getCampaignData: () => CampaignType;
};

export const useCampaignData = create<UpdateCampaignState>()(
  immer((set, get) => ({
    campaignData: {
      campaign: {
        key: "",
        dateCreated: "",
        duration: 0,
        games: [],
        id: "",
        name: "",
        numOfAttempts: 0,
        passScore: 0,
      },
      isUpdateMode: false,
    },

    setCampaignData(cam: any) {
      set((state) => {
        state.campaignData = {
          campaign: {
            key: cam.key,
            dateCreated: cam.dateCreated,
            duration: cam.duration,
            games: Object.keys(cam.games).length === 0 ? [] : cam.games,
            // games: cam.games.map((game: any) => game.id),
            id: cam.id,
            name: cam.name,
            numOfAttempts: cam.numOfAttempts,
            passScore: cam.passScore,
          },
          isUpdateMode: true,
        };
      });
    },

    resetUpdateMode() {
      set((state) => {
        state.campaignData = {
          campaign: {
            key: "",
            dateCreated: "",
            duration: 0,
            games: [],
            id: "",
            name: "",
            numOfAttempts: 0,
            passScore: 0,
          },
          isUpdateMode: false,
        };
      });
    },

    getCampaignData() {
      return get().campaignData.campaign;
    },

    getUpdateMode() {
      return get().campaignData.isUpdateMode;
    },
  }))
);
