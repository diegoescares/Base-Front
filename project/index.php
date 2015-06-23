<?php $URL = 'http://'.$_SERVER['SERVER_NAME'].dirname($_SERVER['PHP_SELF']) ?><!DOCTYPE html><!--[if IE 8]>
<html lang="es" class="lt-ie9">
<![endif]-->
<!--[if gt IE 8]><!-->
<html lang="es">
<!--<![endif]-->
<head>
  <title>Base Front</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <meta name="description" content="">
  <!-- Meta tags facebook-->
  <meta property="og:title" content="Base Front">
  <meta property="og:description" content="">
  <meta property="og:url" content="">
  <meta property="og:image" content="">
  <!-- Meta tags twitter cards-->
  <meta name="twitter:title" content="Base Front">
  <meta name="twitter:description" content="">
  <meta name="twitter:creator" content="">
  <meta name="twitter:site" content="">
  <meta name="twitter:card" content="">
  <meta name="twitter:image:src" content="">
  <!-- Style-->
  <link href="<?= $URL ?>/css/main.css" rel="stylesheet" type="text/css">
  <link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet" type="text/css">
  <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
  <link href="<?= $URL ?>/img/favicon.png" rel="shortcut icon">
  <!-- Scripts-->
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <script src="<?= $URL ?>/js/main.js"></script>
  <!--[if lt IE 9]> <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script> <![endif]-->
  
</head>
<body>
  <header>
    <div class="header-top">
      <div class="header-limit">
        <div class="header-inner">
          <div class="header-logo"><a href="<?= $URL ?>">Base Front</a></div>
          <div class="header-nav">
            <nav>
              <ul>
                <li><a href="<?= $URL ?>">Inicio</a></li>
                <li><a href="<?= $URL ?>/single.php">Single</a></li>
                <li><a href="<?= $URL ?>/demo.php">Demo</a></li>
                <li><a href="#">Multi-menu</a>
                  <ul>
                    <li><a href="#">Lorem ipsum 1</a></li>
                    <li><a href="#">Lorem ipsum 2</a></li>
                    <li><a href="#">Lorem ipsum 3</a>
                      <ul>
                        <li><a href="#">Lorem ipsum 3.1</a></li>
                        <li><a href="#">Lorem ipsum 3.2</a></li>
                        <li><a href="#">Lorem ipsum 3.3</a></li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <div class="header-menu-button secretmenu-button"></div>
    <div class="header-menu secretmenu">
      <div class="header-menu-back"></div>
      <div class="header-menu-inner secretmenu-translate">
        <div class="header-menu-content">
          <div data-copy=".header-nav" class="secretmenu-lvl"></div>
        </div>
      </div>
    </div>
  </header>
  <div id="body">
    <div class="limit inner inner-2">
      <div class="cols">
        <div class="row">
          <div class="col col-66">
            <article class="article-bg">
              <div class="article-image">
                <div class="bg"><img src="http://lorempixel.com/400/300/technics/1" alt="Base Front"/>
                </div>
              </div>
              <div class="article-cover">
                <div class="article-date">24/23/223</div>
                <h2 class="article-title"><a href="<?= $URL ?>/single.php">Nunc habitasse arcu lacus placerat</a></h2>
                <p class="article-description">Ultrices phasellus turpis convallis phasellus elit per in adipiscing turpis
                </p><a href="<?= $URL ?>/single.php" class="button button-line-white button-cover">Leer más</a>
              </div>
            </article>
          </div>
          <div class="col col-33">
            <article class="article-default">
              <div class="article-image"><img src="http://lorempixel.com/400/300/technics/4" alt="Base Front"/>
              </div>
              <div class="article-body">
                <!--.article-category: a(href="#") Hola-->
                <div class="article-date">24/23/223</div>
                <h3 class="article-title"><a href="<?= $URL ?>/single.php">Dui ornare purus proin faucibus</a></h3>
                <p class="article-description">Donec sollicitudin feugiat sed tellus justo per lacus mollis taciti
                </p>
                <!--.article-shares
                a.share.share-facebook(href="#")
                a.share.share-twitter(href="#")
                a.share.share-instagram(href="#")
                a.share.share-googleplus(href="#")
                a.share.share-linkedin(href="#")
                --><a href="<?= $URL ?>/single.php" class="button button-cover">Leer más</a>
              </div>
            </article>
          </div>
        </div>
        <div class="row">
          <div class="col col-33">
            <article class="article-default">
              <div class="article-image"><img src="http://lorempixel.com/400/300/technics/2" alt="Base Front"/>
              </div>
              <div class="article-body">
                <!--.article-category: a(href="#") Hola-->
                <div class="article-date">24/23/223</div>
                <h3 class="article-title"><a href="<?= $URL ?>/single.php">Enim hendrerit nisi interdum pulvinar</a></h3>
                <p class="article-description">Accumsan enim ultrices id tristique mattis sapien himenaeos cras lacus
                </p>
                <!--.article-shares
                a.share.share-facebook(href="#")
                a.share.share-twitter(href="#")
                a.share.share-instagram(href="#")
                a.share.share-googleplus(href="#")
                a.share.share-linkedin(href="#")
                --><a href="<?= $URL ?>/single.php" class="button button-cover">Leer más</a>
              </div>
            </article>
          </div>
          <div class="col col-33">
            <article class="article-default">
              <div class="article-image"><img src="http://lorempixel.com/400/300/technics/1" alt="Base Front"/>
              </div>
              <div class="article-body">
                <!--.article-category: a(href="#") Hola-->
                <div class="article-date">24/23/223</div>
                <h3 class="article-title"><a href="<?= $URL ?>/single.php">Fringilla cursus donec purus taciti</a></h3>
                <p class="article-description">Enim etiam condimentum viverra ut vehicula pulvinar ultricies quam iaculis
                </p>
                <!--.article-shares
                a.share.share-facebook(href="#")
                a.share.share-twitter(href="#")
                a.share.share-instagram(href="#")
                a.share.share-googleplus(href="#")
                a.share.share-linkedin(href="#")
                --><a href="<?= $URL ?>/single.php" class="button button-cover">Leer más</a>
              </div>
            </article>
          </div>
          <div class="col col-33">
            <article class="article-min">
              <div class="article-image"><img src="http://lorempixel.com/200/200/technics/6" alt="Base Front"/>
              </div>
              <div class="article-body">
                <div class="article-date">24/23/223</div>
                <h3 class="article-title"><a href="<?= $URL ?>/single.php">Maecenas ligula enim convallis phasellus</a></h3>
                <p class="article-description">Venenatis himenaeos pretium curae integer orci elit ligula per congue
                </p>
              </div>
            </article>
            <article class="article-min">
              <div class="article-image"><img src="http://lorempixel.com/200/200/technics/5" alt="Base Front"/>
              </div>
              <div class="article-body">
                <div class="article-date">24/23/223</div>
                <h3 class="article-title"><a href="<?= $URL ?>/single.php">Euismod himenaeos torquent felis lacinia</a></h3>
                <p class="article-description">Consequat mattis dictumst mollis habitasse taciti a ut vel pulvinar
                </p>
              </div>
            </article>
            <article class="article-min">
              <div class="article-image"><img src="http://lorempixel.com/200/200/technics/4" alt="Base Front"/>
              </div>
              <div class="article-body">
                <div class="article-date">24/23/223</div>
                <h3 class="article-title"><a href="<?= $URL ?>/single.php">Diam elementum porttitor adipiscing leo</a></h3>
                <p class="article-description">Sapien proin mauris sollicitudin eros sem euismod ad malesuada suscipit
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--footer-->
</body></html>