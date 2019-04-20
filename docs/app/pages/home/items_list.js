/* global zuix */
'use strict';
zuix.controller(function(cp) {
  const zx = zuix; // shorthand
  let itemsList;

  cp.create = function() {
    let group = cp.view().attr('data-o-group');
    // connector.getGroupItems()
    return;
    let itemsListUrl = 'http://192.168.2.235/api/HomeAutomation.HomeGenie/Config/Groups.ModulesList/Soggiorno';
    zx.$.ajax({
      url: itemsListUrl,
      username: 'admin',
      password: 'testt',
      success: function(res) {
        itemsList = JSON.parse(res);
        refresh();
      },
      error: function(err) {
        // TODO: handle error
      }
    });
  };

  function refresh() {
    const list = cp.field('list');
    if (itemsList != null) {
      zx.$.each(itemsList, function(i, item) {
// Access-Control-Allow-Origin: *
console.log(item);
        const options = {
          lazyLoad: true,
          model: item
        };
        let el;
        /*
        if (i < 5) {
          // different layout for first 4 items (bigger)
          el = zx.createComponent('pages/home/items_list/item', options).container();
          // 2 columns layout
          if (i < 2) {
            el.setAttribute('self', 'size-1of2 lg-full md-full sm-full');
          } else {
            el.setAttribute('self', 'size-1of3 lg-half md-half sm-full');
          }
          el.setAttribute('class', 'card-wrapper'); // <-- will this work?
        } else {
          // "mini" layout for subsequent items
          el = zx.createComponent('pages/home/items_list/item_mini', options).container();
          // 4 columns layout
          el.setAttribute('self', 'size-1of4 lg-half md-half sm-full');
          el.setAttribute('class', 'card-wrapper mini'); // <-- will this work?
        }
        */
        const deviceType = item.DeviceType;
        const widgetType = item.Properties.find((item) => item.Name === 'Widget.DisplayModule');
        console.log(deviceType, widgetType != null ? widgetType.Value : '-');
        // TODO: load a specific component based on `widgetType` or `deviceType`
        //       (now just loading the same widget for all: `widgets/switch`)
        let componentId = 'widgets/switch';
        if (widgetType != null) {
          if (widgetType.Value === 'homegenie/generic/program') {
            componentId = 'widgets/program';
          } //else return true;
        }
        el = zx.createComponent(componentId, options).container();
        // center the list on wide screens
        el.setAttribute('layout', 'column stretch-center');
        list.append(el);
      });
      zuix.componentize();
    }
  }

  // Download modules list
  function fetchList(url) {
    // CORS proxy https://cors-anywhere.herokuapp.com/
    zx.$.ajax({
      url: rssUrl,
      success: function(res) {
        itemsList = parseRss(res);
        refresh();
      },
      error: function(err) {
        // TODO: handle error
      }
    });
  }

  // Parse RSS feed and create a JSON object out of it
  function parseRss(rssText) {
    const items = [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(rssText, 'text/xml');
    let d = zx.$(doc);
    d.find('channel > item').each(function(i, el) {
      const title = getText(this.find('title'));
      const description = getText(this.find('description'));
      const pubDate = getText(this.find('pubDate'));
      const link = getText(this.find('link'));
      const imageList = this.find('[medium="image"]');
      if (title !== '') {
        const images = [];
        // parse images to a json list
        imageList.each(function(i, el) {
          images.push({
            url: this.attr('url'),
            width: this.attr('width'),
            height: this.attr('height')
          });
        });
        let cover;
        if (i < 5 && images[3] != null) cover = images[3].url;
        else if (i > 3 && images[4] != null) cover = images[4].url;
        const date = pubDate; // TODO: format date
        items.push({
          title,
          link,
          cover,
          date,
          images
        });
      }
    });
    return items;
  }

  function getText(node) {
    let text;
    // if node is ZxQuery, then get underlying HTMLElement
    if (node.length() > 0) node = node.get();
    if (node != null && node.firstChild != null) {
      // get rid of CDATA wrapper eventually
      text = node.firstChild.nodeValue;
    } else if (node != null) {
      // get value as is
      text = node.innerHTML;
    }
    return text;
  }
});
