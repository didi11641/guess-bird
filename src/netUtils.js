export const fetchNearbyBirdObservations = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://api.ebird.org/v2/data/obs/geo/recent?sppLocale=zh_SIM&lat=${lat}&lng=${lng}`,
      {
        headers: {
          // 你可以在 https://ebird.org/api/request 上申请
          'x-ebirdapitoken': '674ukrope95t'
        }
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching bird observations:', error);
    return null;
  }
};

export const fetchAudioRecordings = async (sciName) => {
  try {
    console.log(`Fetching audio recording for species: ${sciName}`);
    const response = await fetch(
      `https://xeno-canto.org/api/2/recordings?query=${sciName}+cnt:china+grp:birds`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching bird audios:', error);
    return null;
  }
};