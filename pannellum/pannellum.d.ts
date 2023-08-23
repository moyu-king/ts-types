interface HotSpotBase {
  pitch?: number,
  yaw?: number,
  text?: string,
  cssClass?: string,
  /**
   * 创建热点dom的函数
   */
  createTooltipFunc?: (...arg: any[]) => void,
  createTooltipArgs?: string
}

interface SceneHotSpot extends HotSpotBase {
  type: 'scene',
  sceneId: string
}

interface InfoHotSpot extends HotSpotBase {
  type: 'info',
  URL: string
}

type ComposeHotSpot = SceneHotSpot | InfoHotSpot

declare interface InitialBaseConfig {
  /**
   * 热点id，供 removeHotSpot 删除热点使用
   */
  id?: string,
  /**
   * 自动加载，否则需要点击
   */
  autoLoad?: boolean,
  /**
   * 自动旋转，正数向右，负数向左，绝对值越大速度越快
   */
  autoRotate?: number,
  /**
   * 预览图片地址
   */
  preview?: string,
  title?: string,
  author?: string,
  /**
   * 显示指南针
   */
  compass?: boolean,
  /**
   * 是否可拖动
   */
  draggable?: boolean,
  northOffset?: number,
  pitch?: number,
  yaw?: number,
  /**
   * 视野(远近缩放)
   */
  hfov?: number,
  /**
   * 视野最大值
   */
  maxHfov?: number,
  /**
   * 俯仰角度最大值
   */
  maxPitch?: number,
  maxYaw?: number,
  /**
   * 视野最小值
   */
  minHfov?: number,
  /**
   * 俯仰角度最小值
   */
  minPitch?: number,
  minYaw?: number,
  /**
   * 重力感应模式
   */
  orientationOnByDefault?: boolean,
  /**
   * 鼠标滚轮缩放
   */
  mouseZoom?: boolean,
  /**
   * 显示控制按钮
   */
  showControls?: boolean,
  /**
   * 触摸输入的平移速度，默认为1
   */
  touchPanSpeedCoeffFactor?: number,
  /**
   * 画面移动后的”摩擦系数“取值范围(0, 1]
   */
  friction?: number,
  /**
   * 动画移动计时函数，默认为 easeInOutQuad
   */
  animationTimingFunction?: string,
  /**
   * 热点信息配置
   */
  hotSpots?: ComposeHotSpot[],
  sceneFadeDuration?: number
}

interface EquirectangularConfig extends InitialBaseConfig {
  type: 'equirectangular',
  panorama: string,
  haov?: number,
  vaov?: number,
  vOffset?: number,
  ignoreGPanoXMP?: boolean
}

interface CubemapConfig extends InitialBaseConfig {
  type: 'cubemap',
  /**
   * 设置六个立方体面图像URL，顺序为前、右、后、左、上、下
   */
  cubeMap: [string, string, string, string, string, string]
}

interface MultiresConfig extends InitialBaseConfig {
  type: 'multires',
  multiRes: {
    basePath?: string,
    path: string,
    fallbackPath: string,
    extension: string,
    tileResolution: number,
    maxLevel: number,
    cubeResolution: number
  }
}

type ComposeConfig = EquirectangularConfig | CubemapConfig | MultiresConfig

interface sceneConfig extends InitialBaseConfig {
  /**
   * 指定第一个加载的场景
   */
  firstScene?: string,
  /**
   * 场景配置
   */
  scenes?: Record<string, ComposeConfig>
}

type InitialConfig = ComposeConfig | sceneConfig

declare interface PannellumViewer {
  isLoaded: boolean,
  getPitch: number,
  setPitch(pitch: number, animated?: boolean | number, callback?:() => void, callbackArgs?: Record<string, any>): PannellumViewer,
  getPitchBounds(): number[],
  setPitchBounds(bounds: number[]): PannellumViewer,
  getYaw(): number,
  setYaw(yaw: number, animated?: boolean | number, callback?:() => void, callbackArgs?: Record<string, any>): PannellumViewer,
  getYawBounds(): number[],
  setYawBounds(bounds: number[]): PannellumViewer,
  getHfov(): number,
  setHfov(hfov: number, animated?: boolean | number, callback?:() => void, callbackArgs?: Record<string, any>): PannellumViewer,
  getHfovBounds(bounds: number[]): PannellumViewer,
  setHfovBounds(bounds: number[]): PannellumViewer,
  lookAt(pitch: number, yaw: number, hfov: number, animated?: boolean | number, callback?:() => void, callbackArgs?: Record<string, any>): PannellumViewer,
  getNorthOffset(): number,
  setNorthOffset(heading: number): PannellumViewer,
  getHorizonRoll(): number,
  setHorizonRoll(roll: number): PannellumViewer,
  getHorizonPitch(): number,
  setHorizonPitch(pitch: number): PannellumViewer,
  startAutoRotate(speed: number, pitch: number): PannellumViewer,
  stopAutoRotate(): PannellumViewer,
  getRenderer(): any,
  setUpdate(bool: boolean): PannellumViewer,
  mouseEventToCoords(event?: MouseEvent): number[],
  loadScene(sceneId: string, pitch?: number, yaw?: number, hfov?: number): PannellumViewer,
  getScene(): string,
  addScene(sceneId: string, config: string): PannellumViewer,
  removeScene(sceneId: string): boolean,
  toggleFullscreen(): PannellumViewer,
  getConfig(): Record<string, any>,
  getContainer(): HTMLElement,
  addHotSpot(hs: Record<string, any>, sceneId?: string): PannellumViewer,
  removeHotSpot(hotSpotId: string, sceneId?: string): boolean,
  resize(): boolean,
  stopOrientation(): void,
  startOrientation(): void,
  isOrientationActive(): boolean,
  on(type: 'load' | 'scenechange' | 'fullscreenchange' | 'zoomchange' | 'scenechangefadedone' | 'animatefinished' | 'error' | 'errorcleared' | 'mousedown' | 'mouseup' | 'touchstart' | 'touchend', listener: (...arg: any[]) => any): PannellumViewer,
  destroy(): void,
  off(type: string, listener: () => any): PannellumViewer
}

declare const pannellum: { PannellumViewer(container: HTMLElement | string, initialConfig: InitialConfig): PannellumViewer }
