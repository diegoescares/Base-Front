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
    <script src="http://maps.google.com/maps/api/js?sensor=false"></script>
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
        <div class="page-header lighter">
          <div class="limit">
            <div class="inner inner-4">
              <h1>Base Front Demo</h1>
            </div>
          </div>
        </div>
        <div class="page">
          <section>
            <div class="limit">
              <div class="inner inner-2">
                <div class="content">
                  <h2>Layout</h2>
                  <div class="cols cols-doublesep">
                    <div class="col col-33 col-to100 col-right">
                      <div class="inner lighter">.col.col-33</div>
                    </div>
                    <div class="col col-66">
                      <div class="inner lighter">.col.col-66</div>
                    </div>
                    <div class="col col-50 col-nobreak">
                      <div class="inner lighter">.col.col-50.col-nobreak</div>
                    </div>
                    <div class="col col-50 col-nobreak">
                      <div class="inner lighter">.col.col-50.col-nobreak</div>
                    </div>
                    <div class="col col-25">
                      <div class="inner lighter">.col.col-25</div>
                    </div>
                    <div class="col col-25">
                      <div class="inner lighter">.col.col-25</div>
                    </div>
                    <div class="col col-25">
                      <div class="inner lighter">.col.col-25</div>
                    </div>
                    <div class="col col-25">
                      <div class="inner lighter">.col.col-25</div>
                    </div>
                    <div class="col col-20">
                      <div class="inner lighter">.col.col-20</div>
                    </div>
                    <div class="col col-20">
                      <div class="inner lighter">.col.col-20</div>
                    </div>
                    <div class="col col-20">
                      <div class="inner lighter">.col.col-20</div>
                    </div>
                    <div class="col col-20 col-nobreak1">
                      <div class="inner lighter">.col.col-20.col-nobreak1</div>
                    </div>
                    <div class="col col-20 col-nobreak1">
                      <div class="inner lighter">.col.col-20.col-nobreak1</div>
                    </div>
                  </div>
                  <h2>Columnas activas bajo break point 3</h2>
                  <div class="cols">
                    <div class="col col-60-break3">
                      <div class="inner lighter">.col.col-60-3</div>
                    </div>
                    <div class="col col-40-break3">
                      <div class="inner lighter">.col.col-40-3</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div class="limit">
              <div class="inner inner-2">
                <div class="content">
                  <h2>Botones</h2>
                  <h4>Configuraciones:</h4>
                  <pre>button, button-small, button-medium, button-big
button-color-2, button-white, button-light, button-gray, button-dark, button-line, button-line-white, button-hover-2
</pre>
                  <h4>Normal:</h4><a href="#" class="button button-small">Lorem ipsum</a> <a href="#" class="button">Lorem ipsum</a> <a href="#" class="button button-medium">Lorem ipsum</a> <a href="#" class="button button-big">Lorem ipsum</a>
                  <h4>Color 2:</h4><a href="#" class="button button-color-2 button-small">Lorem ipsum</a> <a href="#" class="button button-color-2">Lorem ipsum</a> <a href="#" class="button button-color-2 button-medium">Lorem ipsum</a> <a href="#" class="button button-color-2 button-big">Lorem ipsum</a>
                  <h4>Light:</h4><a href="#" class="button button-light button-small">Lorem ipsum</a> <a href="#" class="button button-light">Lorem ipsum</a> <a href="#" class="button button-light button-medium">Lorem ipsum</a> <a href="#" class="button button-light button-big">Lorem ipsum</a>
                  <h4>Gray:</h4><a href="#" class="button button-gray button-small">Lorem ipsum</a> <a href="#" class="button button-gray">Lorem ipsum</a> <a href="#" class="button button-gray button-medium">Lorem ipsum</a> <a href="#" class="button button-gray button-big">Lorem ipsum</a>
                  <h4>Dark:</h4><a href="#" class="button button-dark button-small">Lorem ipsum</a> <a href="#" class="button button-dark">Lorem ipsum</a> <a href="#" class="button button-dark button-medium">Lorem ipsum</a> <a href="#" class="button button-dark button-big">Lorem ipsum</a>
                  <h4>Black + hover 2:</h4><a href="#" class="button button-black button-hover-2 button-small">Lorem ipsum</a> <a href="#" class="button button-black button-hover-2">Lorem ipsum</a> <a href="#" class="button button-black button-hover-2 button-medium">Lorem ipsum</a> <a href="#" class="button button-black button-hover-2 button-big">Lorem ipsum</a>
                  <h4>Line:</h4><a href="#" class="button button-line button-small">Lorem ipsum</a> <a href="#" class="button button-line">Lorem ipsum</a> <a href="#" class="button button-line button-medium">Lorem ipsum</a> <a href="#" class="button button-line button-big">Lorem ipsum</a>
                  <h4>White:</h4>
                  <div class="inner dark"><a href="#" class="button button-white button-small">Lorem ipsum</a> <a href="#" class="button button-white">Lorem ipsum</a> <a href="#" class="button button-white button-medium">Lorem ipsum</a> <a href="#" class="button button-white button-big">Lorem ipsum</a></div>
                  <h4>Line:</h4>
                  <div class="inner dark"><a href="#" class="button button-line-white button-small">Lorem ipsum</a> <a href="#" class="button button-line-white">Lorem ipsum</a> <a href="#" class="button button-line-white button-medium">Lorem ipsum</a> <a href="#" class="button button-line-white button-big">Lorem ipsum</a></div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div class="limit">
              <div class="inner inner-2">
                <div class="content">
                  <h2>Alertas</h2>
                  <h4>Simple:</h4>
                  <pre>a(href="#",data-alert="Hola") Simple
a(href="#",data-alert="Hola") Simple
div(data-alert,data-title="Hola",data-content="¡Exito!")
</pre>
                  <h4>Con contenido:</h4>
                  <pre>a(href="#",data-alert="Hola") Link
a(href="#",data-alert="Hola",data-content="¿Seguro que quieres hacer esto?") Link
</pre>
                  <h4>Lanzar al tiro:</h4>
                  <pre>div(data-alert,data-title="Hola",data-content="¡Exito!")
</pre>
                  <h4>Demo:</h4><a href="#" data-alert="Hola" data-content="¿Seguro que quieres hacer esto?" class="button">Abrir alerta</a>
                </div>
              </div>
            </div>
          </section>
          <section class="lighter">
            <div class="limit">
              <div class="inner inner-2">
                <div class="content">
                  <h2>Tabs</h2>
                  <div class="tabs">
                    <div class="tabs-header"><a href="#" class="tab">Lorem</a><a href="#" class="tab">Ipsum</a></div>
                    <div class="tabs-body">
                      <div class="tab">
                        <div class="inner">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto libero, commodi, at ab facere saepe. Sapiente ullam architecto ea voluptatibus harum. Tempore repellendus veritatis voluptates vel culpa voluptatem facilis, dolorum!</div>
                      </div>
                      <div class="tab">
                        <div class="inner">Tempora, expedita hic dolorem id, nisi voluptas tempore non laudantium mollitia? Blanditiis eum ab soluta veniam ipsa accusamus quasi, possimus hic aut sapiente neque voluptas nostrum accusantium quae distinctio id.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div class="limit">
              <div class="inner inner-2">
                <div class="content">
                  <h2>FAQ</h2>
                  <h4>Jade:</h4>
                  <pre>.faq
	.faq-item.faq-open
		h3.faq-question ¿Lorem?
		.faq-answer
			p  Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
	.faq-item
		h3.faq-question ¿Lorem?
		.faq-answer
			p  Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
</pre>
                  <h4>Demo:</h4>
                  <div class="faq">
                    <div class="faq-item faq-open">
                      <h3 class="faq-question">¿Lorem ipsum?</h3>
                      <div class="faq-answer">
                        <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel explicabo dignissimos itaque nemo enim illo repudiandae doloribus repellat accusantium, ipsam laudantium, veritatis aliquam aliquid cupiditate nihil reiciendis maxime eligendi rerum!</p>
                      </div>
                    </div>
                    <div class="faq-item">
                      <h3 class="faq-question">¿Lorem consectetur?</h3>
                      <div class="faq-answer">
                        <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel explicabo dignissimos itaque nemo enim illo repudiandae doloribus repellat accusantium, ipsam laudantium, veritatis aliquam aliquid cupiditate nihil reiciendis maxime eligendi rerum!</p>
                      </div>
                    </div>
                    <div class="faq-item">
                      <h3 class="faq-question">¿Lorem adipisicing?</h3>
                      <div class="faq-answer">
                        <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel explicabo dignissimos itaque nemo enim illo repudiandae doloribus repellat accusantium, ipsam laudantium, veritatis aliquam aliquid cupiditate nihil reiciendis maxime eligendi rerum!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="lighter">
            <div class="limit">
              <div class="inner inner-2">
                <div class="content">
                  <h2>Tablas</h2>
                  <div class="table-container">
                    <table>
                      <tr>
                        <th>Lorem</th>
                        <th>Lorem</th>
                        <th>Lorem</th>
                        <th>Lorem</th>
                        <th>Lorem</th>
                        <th>Lorem</th>
                      </tr>
                      <tr>
                        <td>Lorem</td>
                        <td>Lorem</td>
                        <td>Lorem</td>
                        <td>Lorem</td>
                        <td>Lorem</td>
                        <td>Lorem</td>
                      </tr>
                      <tr>
                        <td>Lorem</td>
                        <td>Lorem</td>
                        <td>Lorem</td>
                        <td>Lorem</td>
                        <td>Lorem</td>
                        <td>Lorem</td>
                      </tr>
                      <tr>
                        <td>Lorem</td>
                        <td>Lorem</td>
                        <td>Lorem</td>
                        <td>Lorem</td>
                        <td>Lorem</td>
                        <td>Lorem</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              <div class="limit">
                <div class="inner inner-1">
                  <nav class="pagination">
                    <ul>
                      <li><a href="#"><<</a></li>
                      <li><a href="#"><</a></li>
                      <li><a href="#">1</a></li>
                      <li><a href="#">2</a></li>
                      <li class="active"><a href="#">3</a></li>
                      <li><a href="#">4</a></li>
                      <li><a href="#">5</a></li>
                      <li><a href="#">></a></li>
                      <li><a href="#">>></a></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div class="limit">
              <div class="inner inner-2">
                <div class="content">
                  <h2>Tooltips</h2>
                  <h4>Jade:</h4>
                  <pre>a(href="#",data-tooltip="Lorem ipsum") Lorem</pre>
                  <pre>a(href="#",data-tooltip="Lorem ipsum",data-tooltip-position="top") Lorem
</pre>
                  <h4>Demo:</h4> Lorem ipsum dolor sit amet, consectetur. Repellat eligendi enim <a href="#" data-tooltip="Ose helou!">lorem</a> recusandae voluptatum commodi quisquam quibusdam perspiciatis veritatis et excepturi dignissimos maxime, mollitia deserunt reprehenderit, quae ipsa itaque corporis laboriosam a facere. Debitis, dolore <a href="#" data-tooltip="Lorem ipsum dolor sit amet, consectetur adipisicing elit." data-tooltip-position="top">ipsum dolor</a> perspiciatis veritatis et excepturi dignissimos maxime, mollitia deserunt reprehenderit, quae ipsa itaque corporis laboriosam a facere.
                </div>
              </div>
            </div>
          </section>
          <section class="lighter">
            <div class="limit">
              <div class="inner inner-2">
                <div class="content">
                  <h2>Formularios</h2>
                </div>
                <div class="tabs">
                  <div class="tabs-header"><a href="#" class="tab">Con layout y centrado</a><a href="#" class="tab">Líquido y centrado</a><a href="#" class="tab">Líquido</a></div>
                  <div class="tabs-body">
                    <div class="tab">
                      <div class="inner inner-2">
                        <form method="POST" action="" class="controls controls-layout controls-center">
                          <div class="control">
                            <div class="control-name">Email</div>
                            <div class="control-value">
                              <input type="email" name="email">
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name">Nombre</div>
                            <div class="control-value">
                              <input type="text" name="nombre">
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name">RUT</div>
                            <div class="control-value">
                              <input type="text" name="rut" class="rut">
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name control-name-2lines">Fecha de Nacimiento</div>
                            <div class="control-value">
                              <div class="cols cols-halfsep cols-nobp">
                                <div class="col col-33">
                                  <div class="col-inner">
                                    <select name="bday_d">
                                      <option value="">Día</option>
                                    </select>
                                  </div>
                                </div>
                                <div class="col col-33">
                                  <div class="col-inner">
                                    <select name="bday_m">
                                      <option value="">Mes</option>
                                    </select>
                                  </div>
                                </div>
                                <div class="col col-33">
                                  <div class="col-inner">
                                    <select name="bday_y">
                                      <option value="">Año</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name">Teléfono</div>
                            <div class="control-value">
                              <div class="cols cols-halfsep cols-nobp">
                                <div class="col col-20">
                                  <div class="col-inner">
                                    <input type="text" maxlength="2" name="phone_prefix">
                                  </div>
                                </div>
                                <div class="col col-80">
                                  <div class="col-inner">
                                    <input type="text" maxlength="8" name="phone">
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name">Región</div>
                            <div class="control-value">
                              <select name="rid" class="optional">
                                <option value="">Selecciona una región</option>
                              </select>
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name">Ciudad</div>
                            <div class="control-value">
                              <input type="text" name="city" class="optional">
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name">Contraseña</div>
                            <div class="control-value">
                              <input type="password" name="pass">
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name control-name-2lines">Confirmar Contraseña</div>
                            <div class="control-value">
                              <input type="password" name="pass2" data-repeat="pass">
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name">Sexo</div>
                            <div class="control-value">
                              <label class="inline">
                                <input type="radio" name="sexo" value="Male"> Masculino
                              </label>
                              <label class="inline">
                                <input type="radio" name="sexo" value="Female"> Femenino
                              </label>
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name">Mensaje</div>
                            <div class="control-value">
                              <textarea name="message"></textarea>
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name"></div>
                            <div class="control-value">
                              <label>
                                <input type="checkbox" name="terms" value="1" class="input-terms"> Acepto
                              </label>
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name"></div>
                            <div class="control-value">
                              <input type="submit" value="Enviar" class="button button-primary">
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div class="tab">
                      <div class="inner inner-2">
                        <form method="POST" action="" class="controls controls-center">
                          <div class="control">
                            <div class="control-name">Email</div>
                            <div class="control-value">
                              <input type="email" name="email">
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name">Nombre</div>
                            <div class="control-value">
                              <input type="text" name="nombre">
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name">RUT</div>
                            <div class="control-value">
                              <input type="text" name="rut" class="rut">
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name control-name-2lines">Fecha de Nacimiento</div>
                            <div class="control-value">
                              <div class="cols cols-halfsep cols-nobp">
                                <div class="col col-33">
                                  <div class="col-inner">
                                    <select name="bday_d">
                                      <option value="">Día</option>
                                    </select>
                                  </div>
                                </div>
                                <div class="col col-33">
                                  <div class="col-inner">
                                    <select name="bday_m">
                                      <option value="">Mes</option>
                                    </select>
                                  </div>
                                </div>
                                <div class="col col-33">
                                  <div class="col-inner">
                                    <select name="bday_y">
                                      <option value="">Año</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name">Teléfono</div>
                            <div class="control-value">
                              <div class="cols cols-halfsep cols-nobp">
                                <div class="col col-20">
                                  <div class="col-inner">
                                    <input type="text" maxlength="2" name="phone_prefix">
                                  </div>
                                </div>
                                <div class="col col-80">
                                  <div class="col-inner">
                                    <input type="text" maxlength="8" name="phone">
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name">Región</div>
                            <div class="control-value">
                              <select name="rid" class="optional">
                                <option value="">Selecciona una región</option>
                              </select>
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name">Ciudad</div>
                            <div class="control-value">
                              <input type="text" name="city" class="optional">
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name">Contraseña</div>
                            <div class="control-value">
                              <input type="password" name="pass">
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name control-name-2lines">Confirmar Contraseña</div>
                            <div class="control-value">
                              <input type="password" name="pass2" data-repeat="pass">
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name">Sexo</div>
                            <div class="control-value">
                              <label class="inline">
                                <input type="radio" name="sexo" value="Male"> Masculino
                              </label>
                              <label class="inline">
                                <input type="radio" name="sexo" value="Female"> Femenino
                              </label>
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name">Mensaje</div>
                            <div class="control-value">
                              <textarea name="message"></textarea>
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name"></div>
                            <div class="control-value">
                              <label>
                                <input type="checkbox" name="terms" value="1" class="input-terms"> Acepto
                              </label>
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name"></div>
                            <div class="control-value">
                              <input type="submit" value="Enviar" class="button button-primary">
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div class="tab">
                      <div class="inner inner-2">
                        <form method="POST" action="" class="controls">
                          <div class="control">
                            <div class="control-name">Email</div>
                            <div class="control-value">
                              <input type="email" name="email">
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name">Nombre</div>
                            <div class="control-value">
                              <input type="text" name="nombre">
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name">RUT</div>
                            <div class="control-value">
                              <input type="text" name="rut" class="rut">
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name control-name-2lines">Fecha de Nacimiento</div>
                            <div class="control-value">
                              <div class="cols cols-halfsep cols-nobp">
                                <div class="col col-33">
                                  <div class="col-inner">
                                    <select name="bday_d">
                                      <option value="">Día</option>
                                    </select>
                                  </div>
                                </div>
                                <div class="col col-33">
                                  <div class="col-inner">
                                    <select name="bday_m">
                                      <option value="">Mes</option>
                                    </select>
                                  </div>
                                </div>
                                <div class="col col-33">
                                  <div class="col-inner">
                                    <select name="bday_y">
                                      <option value="">Año</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name">Teléfono</div>
                            <div class="control-value">
                              <div class="cols cols-halfsep cols-nobp">
                                <div class="col col-20">
                                  <div class="col-inner">
                                    <input type="text" maxlength="2" name="phone_prefix">
                                  </div>
                                </div>
                                <div class="col col-80">
                                  <div class="col-inner">
                                    <input type="text" maxlength="8" name="phone">
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name">Región</div>
                            <div class="control-value">
                              <select name="rid" class="optional">
                                <option value="">Selecciona una región</option>
                              </select>
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name">Ciudad</div>
                            <div class="control-value">
                              <input type="text" name="city" class="optional">
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name">Contraseña</div>
                            <div class="control-value">
                              <input type="password" name="pass">
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name control-name-2lines">Confirmar Contraseña</div>
                            <div class="control-value">
                              <input type="password" name="pass2" data-repeat="pass">
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name">Sexo</div>
                            <div class="control-value">
                              <label class="inline">
                                <input type="radio" name="sexo" value="Male"> Masculino
                              </label>
                              <label class="inline">
                                <input type="radio" name="sexo" value="Female"> Femenino
                              </label>
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name">Mensaje</div>
                            <div class="control-value">
                              <textarea name="message"></textarea>
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name"></div>
                            <div class="control-value">
                              <label>
                                <input type="checkbox" name="terms" value="1" class="input-terms"> Acepto
                              </label>
                            </div>
                          </div>
                          <div class="control">
                            <div class="control-name"></div>
                            <div class="control-value">
                              <input type="submit" value="Enviar" class="button button-primary">
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div class="limit">
              <div class="inner inner-2">
                <div class="content">
                  <h2>Loading</h2>
                  <h4>Jade:</h4>
                  <pre>div(data-loading)
</pre>
                  <h4>Demo:</h4><a href="#" class="button loading-test">Abrir loader</a>
                </div>
              </div>
            </div>
          </section>
          <section class="lighter">
            <div class="limit">
              <div class="inner inner-2">
                <div class="content">
                  <h2>Proportional element</h2>
                  <h4>Jade:</h4>
                  <pre>.prop</pre>
                  <pre>.prop.prop-2-1</pre>
                  <pre>.prop.prop-4-3</pre>
                  <pre>.prop.prop-16-9
</pre>
                  <h4>Demos:</h4>
                </div>
                <div class="cols">
                  <div class="col col-25">
                    <div class="col-inner">
                      <div class="prop white">
                        <div class="cover">
                          <div class="inner">Prop 1:1</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col col-25">
                    <div class="col-inner">
                      <div class="prop prop-2-1 white">
                        <div class="cover">
                          <div class="inner">Prop 2:1</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col col-25">
                    <div class="col-inner">
                      <div class="prop prop-4-3 white">
                        <div class="cover">
                          <div class="inner">Prop 4:3</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col col-25">
                    <div class="col-inner">
                      <div class="prop prop-16-9 white">
                        <div class="cover">
                          <div class="inner">Prop 16:9</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div class="limit">
              <div class="inner inner-2">
                <div class="content">
                  <h2>Mostrar en scroll</h2>
                  <p>Display scroll = dscroll</p>
                  <h4>Jade:</h4>
                  <pre>.prop.gray.dscroll
</pre>
                  <h4>Demos:</h4>
                </div>
                <div class="cols">
                  <div class="col col-25">
                    <div class="col-inner">
                      <div class="prop gray dscroll"></div>
                    </div>
                  </div>
                  <div class="col col-25">
                    <div class="col-inner">
                      <div class="prop gray dscroll"></div>
                    </div>
                  </div>
                  <div class="col col-25">
                    <div class="col-inner">
                      <div class="prop gray dscroll"></div>
                    </div>
                  </div>
                  <div class="col col-25">
                    <div class="col-inner">
                      <div class="prop gray dscroll"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="lighter">
            <div class="limit">
              <div class="inner inner-2">
                <div class="content">
                  <h2>Slider</h2>
                  <h4>Jade:</h4>
                  <pre>.slider
	.slider-slides
		.slide
			.prop.prop-2-1
				| Contenido
		.slide
			.prop.prop-2-1
				| Contenido
		.slide
			.prop.prop-2-1
				| Contenido</pre>
                  <pre>.slider.slider-content.slider-directional
	.slider-slides
	.slider-slides-generate(data-items="4",data-selector=".col")
		.cols
			.col.col-25: .col-inner
				| Contenido
			.col.col-25: .col-inner
				| Contenido
			.col.col-25: .col-inner
				| Contenido
			.col.col-25: .col-inner
				| Contenido
			.col.col-25: .col-inner
				| Contenido
			.col.col-25: .col-inner
				| Contenido
</pre>
                  <h4>Demos:</h4>
                </div>
                <div class="slider">
                  <div class="slider-slides">
                    <div class="slide">
                      <div class="prop prop-2-1 gray">
                        <div class="cover">
                          <div class="va center">1</div>
                        </div>
                      </div>
                    </div>
                    <div class="slide">
                      <div class="prop prop-2-1 color">
                        <div class="cover">
                          <div class="va center">2</div>
                        </div>
                      </div>
                    </div>
                    <div class="slide">
                      <div class="prop prop-2-1 color-2">
                        <div class="cover">
                          <div class="va center">3</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="sep sep-2"></div>
                <div class="slider slider-content slider-directional">
                  <div class="slider-slides"></div>
                  <div data-items="4" data-selector=".col" class="slider-slides-generate">
                    <div class="cols">
                      <div class="col col-25">
                        <div class="col-inner">
                          <div class="prop gray">
                            <div class="cover">
                              <div class="va center">1</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col col-25">
                        <div class="col-inner">
                          <div class="prop gray">
                            <div class="cover">
                              <div class="va center">2</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col col-25">
                        <div class="col-inner">
                          <div class="prop gray">
                            <div class="cover">
                              <div class="va center">3</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col col-25">
                        <div class="col-inner">
                          <div class="prop gray">
                            <div class="cover">
                              <div class="va center">4</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col col-25">
                        <div class="col-inner">
                          <div class="prop color">
                            <div class="cover">
                              <div class="va center">5</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col col-25">
                        <div class="col-inner">
                          <div class="prop color">
                            <div class="cover">
                              <div class="va center">6</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col col-25">
                        <div class="col-inner">
                          <div class="prop color">
                            <div class="cover">
                              <div class="va center">7</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col col-25">
                        <div class="col-inner">
                          <div class="prop color">
                            <div class="cover">
                              <div class="va center">8</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col col-25">
                        <div class="col-inne">
                          <div class="prop color-2">
                            <div class="cover">
                              <div class="va center">9</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col col-25">
                        <div class="col-inner">
                          <div class="prop color-2">
                            <div class="cover">
                              <div class="va center">10</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="dark">
            <div class="limit">
              <div class="inner inner-2">
                <div class="content">
                  <h2>Multi Google Maps & Markers</h2>
                  <h4>Marcadores con contenido:</h4>
                  <pre>.map(data-zoom='14', data-lat='-33.4585000', data-lng='-70.629371')
	.map-marker(data-lat='-33.4600000', data-lng='-70.628371')
		| Optional content marker
	.map-marker(data-lat='-33.4580000', data-lng='-70.629371')
		| Optional content marker
</pre>
                  <h4>Demos:</h4>
                </div>
                <div data-zoom="14" data-lat="-33.4585000" data-lng="-70.629371" class="map prop prop-2-1">
                  <div data-lat="-33.4600000" data-lng="-70.628371" class="map-marker">
                    <ul>
                      <li><i class="fa fa-home"></i>Avenida del Parque 4161, oficina 103, Ciudad Empresarial</li>
                      <li><a href="tel:+56223935367"><i class="fa fa-phone"></i>+(56) 2 2393 5367</a></li>
                      <li><a href="mailto:contacto@fprogreso.org"><i class="fa fa-envelope"></i>contacto@fprogreso.org</a></li>
                    </ul>
                  </div>
                  <div data-lat="-33.4580000" data-lng="-70.629371" class="map-marker">
                    <div class="content inner inner-half">
                      <h3>Lorem ipsum dolor</h3>
                      <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, nihil odit voluptatibus iure temporibus repellat quo hic fugiat consequatur sequi ipsa minus harum nemo molestias, atque ullam suscipit! Eaque, delectus.</p>
                    </div>
                  </div>
                </div>
                <div class="sep"></div>
                <div data-zoom="16" data-lat="-33.4585000" data-lng="-70.629371" class="map prop prop-2-1">
                  <div data-lat="-33.4600000" data-lng="-70.629371" class="map-marker">:3</div>
                  <div data-lat="-33.4580000" data-lng="-70.628371" class="map-marker"></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <!--footer-->
      
      
      
      
      
    </div>
  </body>
</html>