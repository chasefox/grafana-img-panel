import _ from 'lodash';
import sid from 'shortid';
import { PanelCtrl } from 'grafana/app/plugins/sdk';

const defaultURL = `public/plugins/chasefox-img-panel/img/Demo.png`;

export class IMGCtrl extends PanelCtrl {
  static templateUrl = `public/plugins/chasefox-img-panel/partials/module.html`;

  url: string;
  _interval: number;
  sid=sid.generate()

  panelDefaults = {
    url: defaultURL,
    doInterval: true,
    intervalS : 60, //5 minute interval didn't seem reliable.
    bustCache : false
  };

  /** @ngInject */
  constructor($scope, $injector) {
    super($scope, $injector);

    _.defaults(this.panel, this.panelDefaults);

    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('refresh', this.onRefresh.bind(this));
    this.events.on('render', this.onRender.bind(this));

    const renderWhenChanged = (scope: any) => {
      const { panel } = scope.ctrl;
      return panel.url;
    };

    $scope.$watch(
      renderWhenChanged,
      _.throttle(() => {
        this.render();
      }, 100)
    );
  }

  onInitEditMode() {
    this.addEditorTab('Options', 'public/plugins/chasefox-img-panel/partials/editor.html');
  }

  onRefresh() {
    this.render();
  }

  onRender() {
    this.updateContent(this.panel.url/*, this.panel.bustCache*/);
    this.renderingCompleted();
  }

  refreshImage(url: string, bustCache: boolean){
    /* This manual image element update was added after failing to update
    through angular during interval */
    if(bustCache) url += `?at=${(new Date()).getTime()}`
    $(`img#${this.sid}`).attr('src', url)
  }
  updateContent(url: string/*, bustCache: boolean*/) {
    // let d = new Date()
    // if(bustCache) url += `?at=${d.getHours()}${d.getMinutes()}${d.getSeconds()}`
    // //This runs, and the cache buster doesn't work, but angular isn't re-rendering unless
    // //the edit option is either opened or closed for the panel.
    // console.log(`Setting URL to ${url}`)
    this.url = url;

    clearInterval(this._interval)
    if(this.panel.doInterval && this.panel.intervalS>0){
      //this._interval = setInterval(this.render.bind(this), this.panel.intervalS*1000)
      this._interval = setInterval(()=>{
        this.refreshImage.call(this, this.panel.url, this.panel.bustCache)
      }, this.panel.intervalS*1000)
    }
  }
}

export { IMGCtrl as PanelCtrl };
