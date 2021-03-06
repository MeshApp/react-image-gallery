import React from 'react';
import ReactDOM from 'react-dom';

import ImageGallery from '../src/ImageGallery';
import PresentationSlider from '../src/presentationSlider';
import InsideNavSlider from '../src/insideNavSlider';
import AndromedaBannerSlider from '../src/andromedaBannerSlider';

const PREFIX_URL = 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      showIndex: false,
      slideOnThumbnailHover: false,
      showBullets: true,
      infinite: true,
      showThumbnails: true,
      showFullscreenButton: true,
      showGalleryFullscreenButton: true,
      showPlayButton: true,
      showGalleryPlayButton: true,
      showNav: true,
      slideDuration: 450,
      slideInterval: 2000,
      thumbnailPosition: 'bottom',
      showVideo: {},
    };
    this.presentationClicked = this.presentationClicked.bind(this)
    // titulo 150 description 250
    //
    this.presentationImages = [
      { original: 'https://www.planwallpaper.com/static/images/4442617-hd-wallpapers.jpg', title: 'title1 Lorem ipsum dolor sit amet, consectetur adipiscing elit.', description: 'description1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta iaculis ultrices. Nulla egestas sagittis urna, quis varius libero pretium ut. Aliquam ac placerat orci. Suspendisse potenti. Integer in nisl turpis. In suscipit ve' },
      { original: '', title: 'title2', description: 'description2' },
      { original: '', title: 'title3', description: '<html><head></head><body><img data-id="83031d32-e858-4d4b-beb8-47e39c632868" src="https://grafly.cdn.meshapp.tech/_grafly/catalog/generated/2018/06/43/2ab6b47fc/image1024x768.jpg" alt="black " style="margin: 0px auto 2rem; display: block;"> <p class="empty"><br></p><ul><li>To make Cascais the best place to live for a day or a lifetime</li></ul><p>Through innnovative public policies and territorial management, attracting leading investments, fostering and managing knowledge, preservation of natural ressources and heritage, engagin citizen participation and intelligent use of technology.</p></body></html>' },
      { original: 'https://www.hd-wallpapersdownload.com/script/bulk-upload/hd-computer-hd-wallpapers-3D.jpg', title: 'title4', description: 'description4' },
      { original: 'http://livewallpaperswide.com/wp-content/uploads/2017/01/wallpaper-hd-1080p-1.jpg', title: 'title5', description: 'description5' }
    ]

    this.images = [
      {
        thumbnail: `${PREFIX_URL}4v.jpg`,
        original: `${PREFIX_URL}4v.jpg`,
        embedUrl: 'https://www.youtube.com/embed/4pSzhZ76GdM?autoplay=1&showinfo=0',
        description: 'Render custom slides within the gallery',
        renderItem: this._renderVideo.bind(this)
      },
      {
        original: `${PREFIX_URL}image_set_default.jpg`,
        thumbnail: `${PREFIX_URL}image_set_thumb.jpg`,
        imageSet: [
          {
            srcSet: `${PREFIX_URL}image_set_cropped.jpg`,
            media: '(max-width: 1280px)',
          },
          {
            srcSet: `${PREFIX_URL}image_set_default.jpg`,
            media: '(min-width: 1280px)',
          }
        ]
      },
      {
        original: `${PREFIX_URL}1.jpg`,
        thumbnail: `${PREFIX_URL}1t.jpg`,
        originalClass: 'featured-slide',
        thumbnailClass: 'featured-thumb',
        description: 'Custom class for slides & thumbnails'
      },
    ].concat(this._getStaticImages());
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.slideInterval !== prevState.slideInterval ||
      this.state.slideDuration !== prevState.slideDuration) {
      // refresh setInterval
      this._imageGallery.pause();
      this._imageGallery.play();
    }
  }

  _onImageClick(event) {
    console.debug('clicked on image', event.target, 'at index', this._imageGallery.getCurrentIndex());
  }

  presentationClicked(item) {
    console.log('aqui', item);

  }

  _onImageLoad(event) {
    console.debug('loaded image', event.target.src);
  }

  _onSlide(index) {
    this._resetVideo();
    console.debug('slid to index', index);
  }

  _onPause(index) {
    console.debug('paused on index', index);
  }

  _onScreenChange(fullScreenElement) {
    console.debug('isFullScreen?', !!fullScreenElement);
  }

  _onPlay(index) {
    console.debug('playing from index', index);
  }

  _handleInputChange(state, event) {
    this.setState({ [state]: event.target.value });
  }

  _handleCheckboxChange(state, event) {
    this.setState({ [state]: event.target.checked });
  }

  _handleThumbnailPositionChange(event) {
    this.setState({ thumbnailPosition: event.target.value });
  }

  _getStaticImages() {
    let images = [];
    for (let i = 2; i < 12; i++) {
      images.push({
        original: `${PREFIX_URL}${i}.jpg`,
        thumbnail: `${PREFIX_URL}${i}t.jpg`
      });
    }

    return images;
  }

  _resetVideo() {
    this.setState({ showVideo: {} });

    if (this.state.showPlayButton) {
      this.setState({ showGalleryPlayButton: true });
    }

    if (this.state.showFullscreenButton) {
      this.setState({ showGalleryFullscreenButton: true });
    }
  }

  _toggleShowVideo(url) {
    this.state.showVideo[url] = !Boolean(this.state.showVideo[url]);
    this.setState({
      showVideo: this.state.showVideo
    });

    if (this.state.showVideo[url]) {
      if (this.state.showPlayButton) {
        this.setState({ showGalleryPlayButton: false });
      }

      if (this.state.showFullscreenButton) {
        this.setState({ showGalleryFullscreenButton: false });
      }
    }
  }

  _renderVideo(item) {
    return (
      <div className='image-gallery-image'>
        {
          this.state.showVideo[item.embedUrl] ?
            <div className='video-wrapper'>
              <a
                className='close-video'
                onClick={this._toggleShowVideo.bind(this, item.embedUrl)}
              >
              </a>
              <iframe
                width='560'
                height='315'
                src={item.embedUrl}
                frameBorder='0'
                allowFullScreen
              >
              </iframe>
            </div>
            :
            <a onClick={this._toggleShowVideo.bind(this, item.embedUrl)}>
              <div className='play-button'></div>
              <img src={item.original} />
              {
                item.description &&
                <span
                  className='image-gallery-description'
                  style={{ right: '0', left: 'initial' }}
                >
                  {item.description}
                </span>
              }
            </a>
        }
      </div>
    );
  }

  render() {
    return (

      <section className='app'>
        <ImageGallery
          ref={i => this._imageGallery = i}
          items={this.images}
          lazyLoad={false}
          onClick={this._onImageClick.bind(this)}
          onImageLoad={this._onImageLoad}
          onSlide={this._onSlide.bind(this)}
          onPause={this._onPause.bind(this)}
          onScreenChange={this._onScreenChange.bind(this)}
          onPlay={this._onPlay.bind(this)}
          infinite={this.state.infinite}
          showBullets={this.state.showBullets}
          showFullscreenButton={this.state.showFullscreenButton && this.state.showGalleryFullscreenButton}
          showPlayButton={this.state.showPlayButton && this.state.showGalleryPlayButton}
          showThumbnails={this.state.showThumbnails}
          showIndex={this.state.showIndex}
          showNav={this.state.showNav}
          thumbnailPosition={this.state.thumbnailPosition}
          slideDuration={parseInt(this.state.slideDuration)}
          slideInterval={parseInt(this.state.slideInterval)}
          slideOnThumbnailHover={this.state.slideOnThumbnailHover}
          additionalClass="app-image-gallery"
          arrowsColor={'red'}
          arrowsSize={'40px'}
        />
        <div style={{ padding: '10px 0px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          MESHAPP - Presentation Slider
        </div>
        <PresentationSlider
          ref={i => this._imageGallery = i}
          items={this.presentationImages}
          lazyLoad={false}
          onClick={this._onImageClick.bind(this)}
          onImageLoad={this._onImageLoad}
          onSlide={this._onSlide.bind(this)}
          onPause={this._onPause.bind(this)}
          onScreenChange={this._onScreenChange.bind(this)}
          onPlay={this._onPlay.bind(this)}
          infinite={this.state.infinite}
          showBullets={true}
          showFullscreenButton={false}
          showPlayButton={false}
          showThumbnails={false}
          showIndex={false}
          showNav={false}
          additionalClass="app-image-gallery"
          dotActiveColor={'red'}
          dotInactiveColor={'black'}
          arrowsColor={'red'}
          arrowsSize={'30px'}
          onSliderClick={this.presentationClicked}
        />
        <div style={{ padding: '10px 0px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          MESHAPP - Andromeda Inside Nav Slider
        </div>
        <InsideNavSlider
          ref={i => this._imageGallery = i}
          items={this.presentationImages}
          lazyLoad={false}
          onClick={this._onImageClick.bind(this)}
          onImageLoad={this._onImageLoad}
          onSlide={this._onSlide.bind(this)}
          onPause={this._onPause.bind(this)}
          onScreenChange={this._onScreenChange.bind(this)}
          onPlay={this._onPlay.bind(this)}
          infinite={this.state.infinite}
          showBullets={true}
          showFullscreenButton={false}
          showPlayButton={false}
          showThumbnails={false}
          showIndex={false}
          showNav={false}
          additionalClass="app-image-gallery"
          dotActiveColor={'red'}
          dotInactiveColor={'black'}
          arrowsColor={'red'}
          arrowsSize={'30px'}
          mobileTitleColor={'black'}
          mobileDescriptionColor={'blue'}
        />
        <div style={{ padding: '10px 0px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          MESHAPP - Andromeda Banner Slider
        </div>
        <AndromedaBannerSlider
          ref={i => this._imageGallery = i}
          items={this.presentationImages}
          lazyLoad={false}
          onClick={this._onImageClick.bind(this)}
          onImageLoad={this._onImageLoad}
          onSlide={this._onSlide.bind(this)}
          onPause={this._onPause.bind(this)}
          onScreenChange={this._onScreenChange.bind(this)}
          onPlay={this._onPlay.bind(this)}
          infinite={this.state.infinite}
          showBullets={true}
          showFullscreenButton={false}
          showPlayButton={false}
          showThumbnails={false}
          showIndex={false}
          additionalClass="app-image-gallery"
          dotActiveColor={'red'}
          dotInactiveColor={'black'}
          arrowsColor={'red'}
          arrowsSize={'30px'}
          fontSize={16}
          titleColor={'white'}
          descriptionColor={'white'}
          onSliderClick={this.presentationClicked}
        />

        <div className='app-sandbox'>

          <div className='app-sandbox-content'>
            <h2 className='app-header'>Settings</h2>

            <ul className='app-buttons'>
              <li>
                <div className='app-interval-input-group'>
                  <span className='app-interval-label'>Play Interval</span>
                  <input
                    className='app-interval-input'
                    type='text'
                    onChange={this._handleInputChange.bind(this, 'slideInterval')}
                    value={this.state.slideInterval} />
                </div>
              </li>

              <li>
                <div className='app-interval-input-group'>
                  <span className='app-interval-label'>Slide Duration</span>
                  <input
                    className='app-interval-input'
                    type='text'
                    onChange={this._handleInputChange.bind(this, 'slideDuration')}
                    value={this.state.slideDuration} />
                </div>
              </li>

              <li>
                <div className='app-interval-input-group'>
                  <span className='app-interval-label'>Thumbnail Bar Position</span>
                  <select
                    className='app-interval-input'
                    value={this.state.thumbnailPosition}
                    onChange={this._handleThumbnailPositionChange.bind(this)}
                  >
                    <option value='bottom'>Bottom</option>
                    <option value='top'>Top</option>
                    <option value='left'>Left</option>
                    <option value='right'>Right</option>
                  </select>
                </div>
              </li>
            </ul>

            <ul className='app-checkboxes'>
              <li>
                <input
                  id='infinite'
                  type='checkbox'
                  onChange={this._handleCheckboxChange.bind(this, 'infinite')}
                  checked={this.state.infinite} />
                <label htmlFor='infinite'>allow infinite sliding</label>
              </li>
              <li>
                <input
                  id='show_fullscreen'
                  type='checkbox'
                  onChange={this._handleCheckboxChange.bind(this, 'showFullscreenButton')}
                  checked={this.state.showFullscreenButton} />
                <label htmlFor='show_fullscreen'>show fullscreen button</label>
              </li>
              <li>
                <input
                  id='show_playbutton'
                  type='checkbox'
                  onChange={this._handleCheckboxChange.bind(this, 'showPlayButton')}
                  checked={this.state.showPlayButton} />
                <label htmlFor='show_playbutton'>show play button</label>
              </li>
              <li>
                <input
                  id='show_bullets'
                  type='checkbox'
                  onChange={this._handleCheckboxChange.bind(this, 'showBullets')}
                  checked={this.state.showBullets} />
                <label htmlFor='show_bullets'>show bullets</label>
              </li>
              <li>
                <input
                  id='show_thumbnails'
                  type='checkbox'
                  onChange={this._handleCheckboxChange.bind(this, 'showThumbnails')}
                  checked={this.state.showThumbnails} />
                <label htmlFor='show_thumbnails'>show thumbnails</label>
              </li>
              <li>
                <input
                  id='show_navigation'
                  type='checkbox'
                  onChange={this._handleCheckboxChange.bind(this, 'showNav')}
                  checked={this.state.showNav} />
                <label htmlFor='show_navigation'>show navigation</label>
              </li>
              <li>
                <input
                  id='show_index'
                  type='checkbox'
                  onChange={this._handleCheckboxChange.bind(this, 'showIndex')}
                  checked={this.state.showIndex} />
                <label htmlFor='show_index'>show index</label>
              </li>
              <li>
                <input
                  id='slide_on_thumbnail_hover'
                  type='checkbox'
                  onChange={this._handleCheckboxChange.bind(this, 'slideOnThumbnailHover')}
                  checked={this.state.slideOnThumbnailHover} />
                <label htmlFor='slide_on_thumbnail_hover'>slide on thumbnail hover (desktop)</label>
              </li>
            </ul>
          </div>

        </div>
      </section>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('container'));
