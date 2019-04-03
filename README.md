# Image Panel

Simple display of an image with an automatic refresh option.


### Basic Usage

Add the panel to a dashboard, and set the URL of the image. The URL can be
either absolute or relative.

### Advanced Usage - refresh options

When refresh is enabled, a refresh interval should be supplied. Setting the
refresh option will attempt to reload the image on the specified interval.

Refresh time of 60 seems to work reliably, while longer refresh times may not.

By default, image refresh will be subject to the browser cache (or any other
cache along the request path). Ideally, images that need to be refreshed should
have their cache headers set by the webserver handling the request.

This panel offers a `bust cache` option which will add a timestamp to the image
URL, which will cause the image to be reloaded every time it is refreshed. This
option is not recommended in production, however, since it can cause cache(s) to
become bloated with excessive copies of the image being refreshed.

---

### Install

First build the plugin by running `npm run-script build`, which will create a
`dist` directory. Copy the contents of the `dist` directory to your grafana
server at `/var/lib/grafana/plugins/chasefox-img-panel`, and then restart
grafana-server.

### Thanks

Thanks to grafana, the txt-panel and clock-panel samples.
