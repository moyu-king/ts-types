// v0.7.0
declare module 'ezuikit-js' {
  type Template =
    | 'simple'
    | 'standard'
    | 'security'
    | 'voice'
    | 'pcRec'
    | 'pcLive'
    | 'mobileLive'
    | 'mobileRec'
    | 'theme'

  interface PlayOptions {
    type: 'live' | 'rec' | 'cloud.rec',
    deviceSerial?: string,
    channelNo?: number,
    hd?: boolean,
    validCode?: number,
    accessToken?: string,
    begin?: string,
    end?: string
  }

  interface Options {
    id: string,
    accessToken: string,
    url: string,
    audio?: number,
    width?: number,
    height?: number,
    autoPlay?: 0 | 1,
    poster?: string & Template,
    template?: string & Template,
    themeData?: Record<string, any>,
    header?: Array<'capturePicture' | 'save' | 'zoom'>,
    footer?: Array<'talk' | 'broadcast' | 'hd' | 'fullScreen'>,
    plugin?: Array<'talk'>,
    handleSuccess?: (data) => void,
    handleError?: (data) => void,
    openSoundCallBack?: (data) => void,
    closeSoundCallBack?: (data) => void,
    startSaveCallBack?: (data) => void,
    stopSaveCallBack?: (data) => void,
    capturePictureCallBack?: (data) => void,
    fullScreenCallBack?: (data) => void,
    fullScreenChangeCallBack?: (data) => void,
    getOSDTimeCallBack?: (data) => void
  }

  interface EZUIKitPlayer {
    stop(): Promise<any>,
    play(url?: string): Promise<any>,
    play(param?: { url: string, accessToken: string }): Promise<any>,
    openSound(): Promise<any>,
    closeSound(): Promise<any>,
    startSave(): Promise<any>,
    stopSave(): Promise<any>,
    enableZoom(): Promise<any>,
    closeZoom(): Promise<any>,
    startTalk(): any,
    stopTalk(): any,
    fullScreen(): Promise<any>,
    cancelFullScreen(): Promise<any>,
    changePlayUrl(options: PlayOptions): Promise<any>,
    reSize(width: number, height: number): any,
    setPoster(pictureUrl: string): Promise<any>,
    getOSDTime(): Promise<any>,
    capturePicture(fileName: string): Promise<any>,
    destroy(): any
  }

  interface ThemeData {
    autoFocus: number,
    poster: string,
    header: {
      color: string,
      activeColor: string,
      backgroundColor: string,
      bthList: Array<{
        iconId: string,
        part: string,
        memo: string,
        isrender: number
      }>
    }
  }

  class EZUIKitPlayer {
    Theme: any

    constructor(option: Options)
  }

  export { EZUIKitPlayer, Template, PlayOptions, ThemeData, Options }
}
