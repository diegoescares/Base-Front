<!DOCTYPE html>
<html lang="es">
  <head>
    <title></title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="description" content="">
    <!-- Meta tags facebook-->
    <meta property="og:title" content="">
    <meta property="og:description" content="">
    <meta property="og:url" content="">
    <meta property="og:image" content="">
    <!-- Meta tags twitter cards-->
    <meta name="twitter:title" content="">
    <meta name="twitter:description" content="">
    <meta name="twitter:creator" content="">
    <meta name="twitter:site" content="">
    <meta name="twitter:card" content="">
    <meta name="twitter:image:src" content="">
    <!-- Style-->
    <link href="<?php echo 'http://'.$_SERVER['SERVER_NAME'].dirname($_SERVER['PHP_SELF']).'/' ?>css/main.css" rel="stylesheet" type="text/css">
    <link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet" type="text/css">
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="<?php echo 'http://'.$_SERVER['SERVER_NAME'].dirname($_SERVER['PHP_SELF']).'/' ?>img/favicon.ico" rel="shortcut icon">
    <!-- Scripts-->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
    <script src="<?php echo 'http://'.$_SERVER['SERVER_NAME'].dirname($_SERVER['PHP_SELF']).'/' ?>js/main.js"></script>
    <!--[if lt IE 9]> <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script> <![endif]-->
  </head>
  <body>
    <header>
      <div class="header-top">
        <div class="header-limit">
          <div class="header-inner">
            <div class="header-logo"><a href="<?php echo 'http://'.$_SERVER['SERVER_NAME'].dirname($_SERVER['PHP_SELF']).'/' ?>">Base Front</a></div>
            <div class="header-nav">
              <nav>
                <ul>
                  <li><a href="<?php echo 'http://'.$_SERVER['SERVER_NAME'].dirname($_SERVER['PHP_SELF']).'/' ?>">Inicio</a></li>
                  <li><a href="<?php echo 'http://'.$_SERVER['SERVER_NAME'].dirname($_SERVER['PHP_SELF']).'/' ?>single.php">Single</a></li>
                  <li><a href="<?php echo 'http://'.$_SERVER['SERVER_NAME'].dirname($_SERVER['PHP_SELF']).'/' ?>demo.php">Demo</a></li>
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
      <div class="body-content">
        <div class="limit">
          <div class="inner">Index</div>
        </div>
      </div>
      <!--footer-->
      
      
      
      
      
    </div>
  </body>
</html>