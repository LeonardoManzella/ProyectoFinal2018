import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class HomePage extends Component {

  render() {
    return (
      <div>
        <main id="page-wrap">
        <nav className="landing navbar navbar-expand-lg navbar-light">
          <div className="container">
            <img src="/img/emprendimientos-logo.png" height="30"/>
            
            <a>LOGIN</a>
          </div>
        </nav>
          <div className="landing">
            <div className="content-body initial-section">
              <div className="table">
                <div className="welcome-title">
                  <h1><strong>Consultoría</strong></h1>
                  <p>Comenzá tu nuevo emprendimiento creativo</p>
                  <span><button className="transparent-button">Comenzar</button></span>
                </div>
              </div>
            </div>
            <div className="content-body white expert-system">
              <div className="row">
                <div className="col-md-2">
                </div>
                <div className="col-md-3">
                  <img src="/img/brain.svg" height="200" className="img-files" />
                </div>
                <div className="col-md-6">
                  <div className="welcome-title">
                    <h2>SISTEMA EXPERTO</h2>
                    <h4>Nuestro sistema experto te brindará ayuda para que puedas realizar tu propio emprendimiento creativo. Te otorgará información sobre distintos conceptos de negocio y te dará sugerencias basandose en tus características.</h4>
                    <span><button className="transparent-button">Ver más</button></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-body gray team">
              <div className="row">
                <div className="col-md-2">
                </div>
                <div className="col-md-6">
                  <div className="welcome-title">
                    <h2>NUESTRO EQUIPO</h2>
                    <h4>El equipo se compone por consultores con conocimiento en industrias creativas, que junto con el sistema experto permitirán hacer un seguimiento del emprendimiento, además de un equipo de desarrollo.</h4>
                    <span><button className="transparent-button">Ver más</button></span>
                  </div>
                </div>
                <div className="col-md-4">
                  <img src="/img/group.svg" height="200" className="img-files" />
                </div>
              </div>
            </div>
            <div className="content-body white clients">
              <div className="table">
                <div className="welcome-title">
                  <h2>NUESTROS CLIENTES</h2>
                  <div className="row">
                    <img src="/img/icon_proyecto.svg" height="200" className="img-files" />
                    <img src="/img/icon_proyecto.svg" height="200" className="img-files" />
                    <img src="/img/icon_proyecto.svg" height="200" className="img-files" />
                  </div>
                  <span><button className="transparent-button">Ver más</button></span>
                </div>
              </div>
            </div>
            <div className="content-body gray">
              <div className="table">
                <div className="welcome-title">
                  <h2>NOTICIAS</h2>
                  <span><button className="transparent-button">Ver más</button></span>
                </div>
              </div>
            </div>
            <div className="content-body white">
              <div className="table">
                <div className="welcome-title">
                  <h2>Necesitás ayuda? Contactanos!</h2>
                  <h4>Estamos para ayudarte. Podes contactarnos por teléfono, mail o a través de nuestras redes sociales.</h4>
                  <span><button className="transparent-button">Ver más</button></span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

HomePage.propTypes = {
};

// <head>
        //   <meta httpEquiv="X-UA-Compatible" content="IE=Edge"/>
        //   <meta charSet="utf-8"/>
        //   <meta name="generator" content="Wix.com Website Builder"/>
        //   <link rel="shortcut icon" href="https://www.wix.com/favicon.ico" type="image/x-icon"/>
        //   <link rel="apple-touch-icon" href="https://www.wix.com/favicon.ico" type="image/x-icon"/>
        //   <meta httpEquiv="X-Wix-Meta-Site-Id" content="639d9fdc-a7bc-40e0-be2b-46044acf3945"/>
        //   <meta httpEquiv="X-Wix-Application-Instance-Id" content="61fa2600-f2b7-433c-9717-06a4b50d8abe"/>
        //   <meta httpEquiv="X-Wix-Published-Version" content="210"/>
        //   <meta httpEquiv="etag" content="4b50b5fd3f68cd6b7b721d8c025c3483"/>
        //   <meta name="format-detection" content="telephone=no"/>
        //   <link rel="alternate" hrefLang="en" href="file:///home/nicole/Desktop/example.html"/>
        //   <link rel="alternate" hrefLang="x-default" href="file:///home/nicole/Desktop/example.html"/>
        //   <meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE"/>
        //   <meta id="wixMobileViewport" name="viewport" content="width=980, user-scalable=yes"/>
        //   {/* <script>
        //     {
        //     try {
        //       window.wixBiSession = {viewerSessionId:'5c666da9-6aa3-4f3a-8e0a-c4c091f41f9f', initialTimestamp: Date.now(), visitorId: '90d5de79-f0e0-417a-9dc2-c25278072555'};
        //       (new Image()).src = 'https://frog.wix.com/bt?src=29&evid=3&pn=1&et=1&v=1.4156.15&msid=639d9fdc-a7bc-40e0-be2b-46044acf3945&vsi=' + wixBiSession.viewerSessionId +
        //         '&url=' + encodeURIComponent(location.href.replace(/^http(s)?:\/\/(www\.)?/, '')) +
        //         '&isp=0&st=3&ts=0&iss=1&c=' + wixBiSession.initialTimestamp + '&vid=' + wixBiSession.visitorId
        //       ;
        //     } catch (e){}
        //   }
        //   </script> */}
        //   <meta name="fragment" content="!"/>
        //   <script type="text/javascript">
        //     var adData = {};
        //     var mobileAdData = {};
            
        //     var usersDomain = "https://users.wix.com/wix-users";
            
        //   </script>
        //   <script type="text/javascript">
        //     var santaBase = 'https://static.parastorage.com/services/santa/1.4156.15';
        //   </script>
        //   <link rel="preload" href="https://static.parastorage.com/services/third-party/requirejs/2.1.15/require.min.js" as="script"/>
        //   <script async="" data-main="https://static.parastorage.com/services/santa/1.4156.15/app/main-r.min.js" src="https://static.parastorage.com/services/third-party/requirejs/2.1.15/require.min.js"></script>
        //   <link rel="preload" href="https://static.parastorage.com/services/santa/1.4156.15/app/main-r.min.js" as="script"/>
        //   {/* <script type="text/javascript"> {
        //     function polyfillsAreLoaded() {
        //       let script = document.createElement('script');
        //       script.src = 'https://static.parastorage.com/services/santa/1.4156.15/app/main-r.min.js';
        //       document.head.appendChild(script);
        //     }}
        //   </script> */}
        //   <link rel="stylesheet" href="./landingStyles2.css"/>
        //   <script type="text/javascript" charSet="utf-8" async="" data-requirecontext="_" data-requiremodule="main-r.min" src="https://static.parastorage.com/services/santa/1.4156.15/app/main-r.min.js"></script><script type="text/javascript" charSet="utf-8" async="" data-requirecontext="_" data-requiremodule="lodash" src="//static.parastorage.com/unpkg/lodash@4.17.10/lodash.min.js"></script><script type="text/javascript" charSet="utf-8" async="" data-requirecontext="_" data-requiremodule="warmupUtilsLib" src="//static.parastorage.com/unpkg/santa-core-utils@1.614.1/dist/warmupUtils.js"></script><script type="text/javascript" charSet="utf-8" async="" data-requirecontext="_" data-requiremodule="imageClientLib" src="//static.parastorage.com/unpkg/image-client-api@1.274.0/dist/imageClientApi.js"></script><script type="text/javascript" charSet="utf-8" async="" data-requirecontext="_" data-requiremodule="layout" src="https://static.parastorage.com/services/santa/1.4156.15/packages-bin/layout/layout.min.js"></script><script type="text/javascript" charSet="utf-8" async="" data-requirecontext="_" data-requiremodule="warmup" src="https://static.parastorage.com/services/santa/1.4156.15/packages-bin/warmup/warmup.min.js"></script><script type="text/javascript" charSet="utf-8" async="" data-requirecontext="_" data-requiremodule="warmupUtils" src="https://static.parastorage.com/services/santa/1.4156.15/packages-bin/warmupUtils/warmupUtils.min.js"></script><script type="text/javascript" charSet="utf-8" async="" data-requirecontext="_" data-requiremodule="tpaWarmup" src="https://static.parastorage.com/services/santa/1.4156.15/packages-bin/tpaWarmup/tpaWarmup.min.js"></script><script type="text/javascript" charSet="utf-8" async="" data-requirecontext="_" data-requiremodule="zepto" src="//static.parastorage.com/unpkg/zepto@1.2.0/dist/zepto.min.js"></script>
        //   <title>finance-consulting</title>
        //   <meta name="fb_admins_meta_tag" content=""/>
        //   <meta name="robots" content="noindex"/>
        //   <meta property="og:type" content="article"/>
        //   <meta property="og:site_name" content="finance-consulting"/>
        //   <link href="./landingStyles8.css" rel="stylesheet"/>
        // </head>
        // <div className="" data-js-loaded="true" >
        //   <a id="SCROLL_TO_TOP"></a>
        //   {/* <script type="text/javascript">
        //     var clientSideRender = false;
        //   </script> */}
        //   <div id="SITE_CONTAINER" data-santa-render-status="SUCCESS" />
        //   <div className="noop" data-santa-version="1.4197.0" data-reactroot="" />
        //   <div>
        //     <link rel="stylesheet" href="./landingStyles3.css" />
        //   </div>
        //   <div id="SITE_BACKGROUND" className="siteBackground" style={{position: 'absolute', top: '0px', height: '2939px', width: '1351px'}}>
        //     <div id="SITE_BACKGROUND_previous_noPrev" className="siteBackgroundprevious" style={{width: '100%', height: '100%'}}>
        //       <div id="SITE_BACKGROUNDpreviousImage" className="siteBackgroundpreviousImage"></div>
        //       <div id="SITE_BACKGROUNDpreviousVideo" className="siteBackgroundpreviousVideo"></div>
        //       <div id="SITE_BACKGROUND_previousOverlay_noPrev" className="siteBackgroundpreviousOverlay"></div>
        //     </div>
        //     <div id="SITE_BACKGROUND_current_customBgImg3vn" style={{top: '0px', backgroundColor: 'rgb(255, 255, 255)', position: 'absolute', width: '100%', height: '100%'}} data-position="absolute" className="siteBackgroundcurrent">
        //       <div id="SITE_BACKGROUND_currentImage_customBgImg3vn" style={{position: 'absolute', top: '0px', height: '100%', width: '100%'}} data-type="bgimage" data-height="100%" className="siteBackgroundcurrentImage" data-image-css="{&quot;backgroundSize&quot;:&quot;&quot;,&quot;backgroundPosition&quot;:&quot;&quot;,&quot;backgroundRepeat&quot;:&quot;&quot;}"></div>
        //       <div id="SITE_BACKGROUNDcurrentVideo" className="siteBackgroundcurrentVideo"></div>
        //       <div id="SITE_BACKGROUND_currentOverlay_customBgImg3vn" style={{position:'absolute',top:'0',width:'100%', height:'100%'}} className="siteBackgroundcurrentOverlay"></div>
        //     </div>
        //   </div>
        //   {/* <style type="text/css" data-styleid="siteBackground">.siteBackground {width:100%;position:absolute;}
        //     .siteBackgroundbgBeforeTransition {position:absolute;top:0;}
        //     .siteBackgroundbgAfterTransition {position:absolute;top:0;}
        //   </style> */}
        //   <div className="SITE_ROOT" id="SITE_ROOT" /*style="width: 100%; top: 0px; padding-bottom: 0px; min-height: 100%; position: relative; margin: 0px auto;"*/ />
        //   <div id="masterPage" browser="[object Object]" /*style="width: 100%; position: static; top: 0px; height: 2939px;" data-ref="masterPage"*//>
        //   <header data-is-mobile="false" data-state="fixedPosition" data-site-width="980" 
        //     // style="position: fixed; margin-top: 0px; left: 0px; margin-left: 0px; width: 100%; min-width: 980px; z-index: 50; top: 0px; height: 64px;" className="style-iin68ohf"
        //      id="SITE_HEADER">
        //     <div 
        //     //style="left:0;width:100%" 
        //     id="SITE_HEADERscreenWidthBackground" className="style-iin68ohfscreenWidthBackground">
        //       <div className="style-iin68ohf_bg"></div>
        //     </div>
        //     <div id="SITE_HEADERcenteredContent" className="style-iin68ohfcenteredContent">
        //       <div 
        //       // style="margin-left:calc((100% - 980px) / 2);width:980px"
        //       id="SITE_HEADERbg" className="style-iin68ohfbg">
        //         <div className="style-iin68ohf_bg-center"></div>
        //       </div>
        //       <div id="SITE_HEADERinlineContent" className="style-iin68ohfinlineContent">
        //         <div id="comp-ihjkt6dp" data-align="center" data-disabled="false" data-margin="0" data-should-use-flex="true" data-width="25" data-height="25"
        //         // style="left: 20px; position: absolute; margin-left: calc((100% - 980px) * 0.5); top: 18px; height: 25px; min-height: 23px; width: 25px;"
        //         className="b3" data-state="desktop shouldUseFlex center"><a href="file:///home/nicole/Desktop/example.html" target="_self" role="button" id="comp-ihjkt6dplink" className="g-transparent-a b3link">
        //           <span id="comp-ihjkt6dplabel" className="b3label">/</span></a></div>
        //         <link rel="stylesheet" href="./landingStyles4.css"/>
        //         <link href="./landingStyles6.css" rel="stylesheet"/>
        //         <nav id="comp-ihjax7ir"
        //           // style="left: 310px; width: 660px; position: absolute; margin-left: calc((100% - 980px) * 0.5); top: 20px; height: 27px; overflow-x: visible;"
        //           data-menuborder-y="0" data-menubtn-border="0" data-ribbon-els="0" data-label-pad="0" data-ribbon-extra="0" data-drophposition="" data-dropalign="center" dir="ltr" className="style-iiqiorta" data-state="center notMobile" data-dropmode="dropDown">
        //           <ul
        //           // style="text-align:center"
        //           aria-label="Site navigation" role="navigation" id="comp-ihjax7iritemsContainer" className="style-iiqiortaitemsContainer">
        //             <li data-direction="ltr" data-listposition="right" data-data-id="dataItem-ihjdceqr" className="style-iiqiortarepeaterButton" data-state="menu  idle link notMobile" id="comp-ihjax7ir4" data-original-gap-between-text-and-btn="10" aria-hidden="false"
        //             //style="width: 126px; height: 27px; position: relative; box-sizing: border-box; overflow: visible; float: right;"
        //             >
        //               <a role="button" tabIndex="0" aria-haspopup="false" data-listposition="right" href="https://www.wix.com/demone2/finance-consulting#!contact/cphez" target="_self" id="comp-ihjax7ir4linkElement" className="style-iiqiortarepeaterButtonlinkElement">
        //                 <div className="style-iiqiortarepeaterButton_gapper">
        //                   <div 
        //                   // style="text-align:center"
        //                   id="comp-ihjax7ir4bg" className="style-iiqiortarepeaterButtonbg">
        //                     <p
        //                     // style="text-align: center; line-height: 27px;"
        //                     id="comp-ihjax7ir4label" className="style-iiqiortarepeaterButtonlabel">Login</p>
        //                   </div>
        //                 </div>
        //               </a>
        //             </li>
        //           </ul>
        //           <div id="comp-ihjax7irmoreButton" className="style-iiqiortamoreButton"></div>
        //           <nav
        //           // style="visibility:hidden"
        //           data-drophposition="" data-dropalign="center" id="comp-ihjax7irdropWrapper" className="style-iiqiortadropWrapper">
        //             <ul
        //             // style="visibility:hidden"
        //             id="comp-ihjax7irmoreContainer" className="style-iiqiortamoreContainer"></ul>
        //           </nav>
        //         </nav>
        //         <link href="./landingStyles7.css" rel="stylesheet"/>
        //       </div>
        //     </div>
        //   </header>
        // </div>

