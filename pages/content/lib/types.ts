export type GameData = {
  trade?: {
    index?: { endpoint?: string };
    get?: { endpoint?: string };
    create?: { endpoint?: string };
    inventory?: { endpoint?: string };
    item?: {
      add?: { endpoint?: string };
      remove?: { endpoint?: string };
    };
    gold?: { update?: { endpoint?: string } };
    accept?: { endpoint?: string };
    unaccept?: { endpoint?: string };
    cancel?: { endpoint?: string };
  };
  search?: { endpoint?: string };
  characters?: { all?: { endpoint?: string } };
  quick_view?: {
    location?: { endpoint?: string };
    enemy?: { endpoint?: string };
    food?: {
      items?: { endpoint?: string };
      feed?: { endpoint?: string };
    };
    dungeon?: { endpoint?: string };
    world_boss?: { endpoint?: string };
  };
  locations?: { travel?: { endpoint?: string } };
  shrine?: {
    progress?: { endpoint?: string };
    contribute?: { endpoint?: string };
  };
  charts?: {
    activity?: {
      endpoint?: string;
      character_id?: number;
      filters?: { [key: string]: string };
      label?: string;
    };
    level?: {
      endpoint?: string;
      character_id?: number;
      filters?: { [key: string]: string };
      label?: string;
    };
  };
  notifications?: {
    index?: { endpoint?: string };
    character?: { id?: number };
  };
  payments?: {
    apple?: { process?: { endpoint?: string } };
    google?: { process?: { endpoint?: string } };
  };
  onesignal?: {
    app_id?: string;
    external_user_id?: string;
  };
  skills?: {
    start?: { endpoint?: string };
    data?: { endpoint?: string };
    max_idle_time?: number;
    nearby_characters?: { endpoint?: string };
  };
};
