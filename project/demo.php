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
  <script src="http://maps.google.com/maps/api/js?sensor=false"></script>
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
    <div class="page">
      <div class="page-header lighter">
        <div class="limit">
          <div class="inner inner-4">
            <h1>Base Front Demo</h1>
          </div>
        </div>
      </div>
      <div class="page-body">
        <section class="section-white">
          <div class="limit">
            <div class="inner inner-2">
              <div class="content">
                <h2>Layout</h2>
                <div class="cols">
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
                <div class="sep"></div>
                <h2>Columnas activas bajo break point 3</h2>
                <div class="cols">
                  <div class="col col-60-break3">
                    <div class="inner lighter">.col.col-60-break3</div>
                  </div>
                  <div class="col col-40-break3">
                    <div class="inner lighter">.col.col-40-break3</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="section-white">
          <div class="limit">
            <div class="inner inner-2">
              <div class="content">
                <h2>Botones</h2>
                <h4>Configuraciones:</h4>
                <pre>button, button-small, button-medium, button-big
button-color-2, button-white, button-light, button-gray, button-dark, button-line, button-line-white, button-hover-2
</pre>
                <h4>Normal:</h4><a href="#" class="button button-small undefined">Lorem ipsum</a> <a href="#" class="button undefined">Lorem ipsum</a> <a href="#" class="button button-medium undefined">Lorem ipsum</a> <a href="#" class="button button-big undefined">Lorem ipsum</a>
                <h4>Lighter:</h4><a href="#" class="button button-small button-lighter">Lorem ipsum</a> <a href="#" class="button button-lighter">Lorem ipsum</a> <a href="#" class="button button-medium button-lighter">Lorem ipsum</a> <a href="#" class="button button-big button-lighter">Lorem ipsum</a>
                <h4>Light:</h4><a href="#" class="button button-small button-light">Lorem ipsum</a> <a href="#" class="button button-light">Lorem ipsum</a> <a href="#" class="button button-medium button-light">Lorem ipsum</a> <a href="#" class="button button-big button-light">Lorem ipsum</a>
                <h4>Gray:</h4><a href="#" class="button button-small button-gray">Lorem ipsum</a> <a href="#" class="button button-gray">Lorem ipsum</a> <a href="#" class="button button-medium button-gray">Lorem ipsum</a> <a href="#" class="button button-big button-gray">Lorem ipsum</a>
                <h4>Dark:</h4><a href="#" class="button button-small button-dark">Lorem ipsum</a> <a href="#" class="button button-dark">Lorem ipsum</a> <a href="#" class="button button-medium button-dark">Lorem ipsum</a> <a href="#" class="button button-big button-dark">Lorem ipsum</a>
                <h4>Black + hover 2:</h4><a href="#" class="button button-small button-black hover-2">Lorem ipsum</a> <a href="#" class="button button-black hover-2">Lorem ipsum</a> <a href="#" class="button button-medium button-black hover-2">Lorem ipsum</a> <a href="#" class="button button-big button-black hover-2">Lorem ipsum</a>
                <h4>Line:</h4><a href="#" class="button button-small button-line">Lorem ipsum</a> <a href="#" class="button button-line">Lorem ipsum</a> <a href="#" class="button button-medium button-line">Lorem ipsum</a> <a href="#" class="button button-big button-line">Lorem ipsum</a>
                <h4>Color 2:</h4><a href="#" class="button button-small button-color-2">Lorem ipsum</a> <a href="#" class="button button-color-2">Lorem ipsum</a> <a href="#" class="button button-medium button-color-2">Lorem ipsum</a> <a href="#" class="button button-big button-color-2">Lorem ipsum</a>
                <h4>White:</h4>
                <div class="inner dark"><a href="#" class="button button-small button-white">Lorem ipsum</a> <a href="#" class="button button-white">Lorem ipsum</a> <a href="#" class="button button-medium button-white">Lorem ipsum</a> <a href="#" class="button button-big button-white">Lorem ipsum</a>
                </div>
                <h4>Line:</h4>
                <div class="inner dark"><a href="#" class="button button-small button-line-white">Lorem ipsum</a> <a href="#" class="button button-line-white">Lorem ipsum</a> <a href="#" class="button button-medium button-line-white">Lorem ipsum</a> <a href="#" class="button button-big button-line-white">Lorem ipsum</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="section-white">
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
        <section class="section-lighter">
          <div class="limit">
            <div class="inner inner-2">
              <div class="content">
                <h2>Tabs</h2>
                <div class="tabs">
                  <div class="tabs-header"><a href="#" class="tab">Porttitor ullamcorper</a><a href="#" class="tab">Fames at</a></div>
                  <div class="tabs-body">
                    <div class="tab">
                      <div class="inner">
                        <p>Elit fermentum eros platea ut nullam convallis feugiat fames ac. Consequat elit auctor feugiat tristique class aliquet turpis sem porttitor. Placerat varius malesuada per sagittis nulla imperdiet interdum ac odio tincidunt maecenas proin class molestie iaculis sodales tincidunt viverra massa.
                        </p>
                      </div>
                    </div>
                    <div class="tab">
                      <div class="inner">
                        <p>Morbi risus quisque scelerisque sagittis donec cubilia aenean vel dui. Ultricies morbi bibendum colus enim malesuada tortor feugiat nam nullam. Curae auctor dictum vel urna urna purus orci auctor mi volutpat mi vulputate mauris torquent habitasse litora felis taciti eleifend.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="section-white">
          <div class="limit">
            <div class="inner inner-2">
              <div class="content">
                <h2>FAQ</h2>
                <h4>Jade:</h4>
                <pre>.faq
	.faq-item.faq-open
		h3.faq-question: +lorem(5)
		.faq-answer
			p: +lorem(40)
	.faq-item
		h3.faq-question: +lorem(5)
		.faq-answer
			p: +lorem(40)
	.faq-item
		h3.faq-question: +lorem(5)
		.faq-answer
			p: +lorem(40)
</pre>
                <h4>Demo:</h4>
                <div class="faq">
                  <div class="faq-item faq-open">
                    <h3 class="faq-question">Vitae ornare a ligula fermentum
                    </h3>
                    <div class="faq-answer">
                      <p>Dictum taciti torquent hac donec proin curabitur proin pretium interdum. Nostra consectetur libero sapien laoreet adipiscing convallis tincidunt gravida velit. Fermentum tempor id cursus quisque habitant scelerisque sodales rhoncus elit porta curabitur varius nisi massa suspendisse varius suscipit aliquam tempor.
                      </p>
                    </div>
                  </div>
                  <div class="faq-item">
                    <h3 class="faq-question">Gravida fusce porta orci porttitor
                    </h3>
                    <div class="faq-answer">
                      <p>Vitae scelerisque facilisis hendrerit ligula nostra justo pharetra quisque bibendum. Faucibus himenaeos duis eget arcu commodo interdum curae primis ut. Cras hendrerit gravida odio etiam habitant ut porttitor cursus nec himenaeos molestie nam fringilla ultrices habitant conubia nullam odio odio.
                      </p>
                    </div>
                  </div>
                  <div class="faq-item">
                    <h3 class="faq-question">Urna platea fames molestie a
                    </h3>
                    <div class="faq-answer">
                      <p>Aenean viverra dui congue convallis convallis nostra nisl litora congue. Malesuada colus pretium justo arcu id dictumst fermentum aenean libero. Lacus torquent vehicula id suspendisse torquent lacinia mauris donec molestie mattis commodo per quis duis per bibendum morbi hendrerit non.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="section-lighter">
          <div class="limit">
            <div class="inner inner-2">
              <div class="content">
                <h2>Tablas</h2>
                <div class="table-container">
                  <table>
                    <tr>
                      <th>Aptent
                      </th>
                      <th>Sodales
                      </th>
                      <th>Aptent
                      </th>
                      <th>Duis
                      </th>
                      <th>Pulvinar
                      </th>
                      <th>Blandit
                      </th>
                      <th>Augue
                      </th>
                      <th>Proin
                      </th>
                    </tr>
                    <tr>
                      <td>Hac posuere
                      </td>
                      <td>Ut vel
                      </td>
                      <td>Semper morbi
                      </td>
                      <td>Risus suscipit
                      </td>
                      <td>Sem et
                      </td>
                      <td>Cubilia litora
                      </td>
                      <td>Venenatis libero
                      </td>
                      <td>Rhoncus ad
                      </td>
                    </tr>
                    <tr>
                      <td>Blandit quam
                      </td>
                      <td>Pharetra aenean
                      </td>
                      <td>Tellus mattis
                      </td>
                      <td>Sollicitudin semper
                      </td>
                      <td>Lacinia sociosqu
                      </td>
                      <td>Dapibus porttitor
                      </td>
                      <td>Ultrices cubilia
                      </td>
                      <td>Fames ut
                      </td>
                    </tr>
                    <tr>
                      <td>Convallis netus
                      </td>
                      <td>Proin blandit
                      </td>
                      <td>Nibh purus
                      </td>
                      <td>Mauris suspendisse
                      </td>
                      <td>In pretium
                      </td>
                      <td>Ut convallis
                      </td>
                      <td>Imperdiet vestibulum
                      </td>
                      <td>Torquent pretium
                      </td>
                    </tr>
                    <tr>
                      <td>Lacinia vestibulum
                      </td>
                      <td>Scelerisque nunc
                      </td>
                      <td>Dictum fringilla
                      </td>
                      <td>Fames duis
                      </td>
                      <td>Feugiat libero
                      </td>
                      <td>Id ad
                      </td>
                      <td>Sed ut
                      </td>
                      <td>Donec id
                      </td>
                    </tr>
                    <tr>
                      <td>Pulvinar a
                      </td>
                      <td>Rhoncus pulvinar
                      </td>
                      <td>Id venenatis
                      </td>
                      <td>Curae magna
                      </td>
                      <td>Aenean dictum
                      </td>
                      <td>Diam nisi
                      </td>
                      <td>Fringilla platea
                      </td>
                      <td>Posuere maecenas
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              <div class="sep"></div>
              <nav class="pagination">
                <ul>
                  <li><a href="#"><span class="fa fa-angle-double-left"></span></a></li>
                  <li><a href="#"><span class="fa fa-angle-left"></span></a></li>
                  <li><a href="#">1</a></li>
                  <li><a href="#">2</a></li>
                  <li class="active"><a href="#">3</a></li>
                  <li><a href="#">4</a></li>
                  <li><a href="#">5</a></li>
                  <li><a href="#"><span class="fa fa-angle-right"></span></a></li>
                  <li><a href="#"><span class="fa fa-angle-double-right"></span></a></li>
                </ul>
              </nav>
            </div>
          </div>
        </section>
        <section class="section-white">
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
        <section class="section-lighter">
          <div class="limit">
            <div class="inner inner-2">
              <h2>Formularios</h2>
              <div class="white inner inner-2">
                <form method="POST" action="" class="controls controls-center validate">
                  <div class="control">
                    <div class="control-name">Nombre</div>
                    <div class="control-value">
                      <input type="text" name="name"/>
                    </div>
                  </div>
                  <div class="control">
                    <div class="control-name">Email</div>
                    <div class="control-value">
                      <input type="email" name="email"/>
                    </div>
                  </div>
                  <div class="control">
                    <div class="control-name">RUT</div>
                    <div class="control-value">
                      <input type="text" name="rut" class="input-rut"/>
                    </div>
                  </div>
                  <div class="control">
                    <div class="control-name">Fecha de nacimiento</div>
                    <div class="control-value">
                      <input type="text" name="dob"/>
                    </div>
                  </div>
                  <div class="control">
                    <div class="control-name">Teléfono</div>
                    <div class="control-value">
                      <input type="text" name="phone"/>
                    </div>
                  </div>
                  <div class="control">
                    <div class="control-name">Región</div>
                    <div class="control-value">
                      <select name="region">
                        <option>Selecciona...</option>
                        <option>Praesent inceptos
                        </option>
                        <option>Senectus consequat
                        </option>
                        <option>Neque vitae
                        </option>
                        <option>Erat feugiat
                        </option>
                        <option>Integer augue
                        </option>
                        <option>Sem mollis
                        </option>
                        <option>Luctus inceptos
                        </option>
                        <option>Aptent fringilla
                        </option>
                        <option>Quisque faucibus
                        </option>
                        <option>Vulputate donec
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="control">
                    <div class="control-name">Ciudad</div>
                    <div class="control-value">
                      <select name="city">
                        <option>Selecciona...</option>
                        <option>Velit nisi
                        </option>
                        <option>Purus fringilla
                        </option>
                        <option>Rutrum eleifend
                        </option>
                        <option>Aliquam lectus
                        </option>
                        <option>Bibendum diam
                        </option>
                        <option>Sed nullam
                        </option>
                        <option>Gravida auctor
                        </option>
                        <option>Quam eget
                        </option>
                        <option>Ultrices sociosqu
                        </option>
                        <option>Elementum hac
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="control">
                    <div class="control-name">Mensaje</div>
                    <div class="control-value">
                      <textarea name="message"></textarea>
                    </div>
                  </div>
                  <div class="control">
                    <div class="control-name">Contraseña</div>
                    <div class="control-value">
                      <input type="password" name="password"/>
                    </div>
                  </div>
                  <div class="control">
                    <div class="control-name">Repetir contraseña</div>
                    <div class="control-value">
                      <input type="password" name="password_repeat" data-repeat="password"/>
                    </div>
                  </div>
                  <div class="control">
                    <div class="control-name">Sexo</div>
                    <div class="control-value">
                      <label class="label-inline">
                        <input type="radio" name="gender" value="m"/> Masculino
                      </label>
                      <label class="label-inline">
                        <input type="radio" name="gender" value="f"/> Femenino
                      </label>
                    </div>
                  </div>
                  <div class="control">
                    <div class="control-name"></div>
                    <div class="control-value">
                      <label class="label-inline">
                        <input type="checkbox" name="terms" value="true" class="input-terms"/> Acepto los términos legales
                      </label>
                    </div>
                  </div>
                  <div class="right">
                    <button class="button button-medium">Enviar<span class="fa fa-angle-right"></span></button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section class="section-white">
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
        <section class="section-lighter">
          <div class="limit">
            <div class="inner inner-2">
              <div class="content">
                <h2>Proportional element</h2>
                <h4>Jade:</h4>
                <pre>.prop</pre>
                <pre>.prop.prop-2-1</pre>
                <pre>.prop.prop-4-3</pre>
                <pre>.prop.prop-16-9</pre>
                <h4>Demos:</h4>
                <div class="cols">
                  <div class="col col-25">
                    <div class="prop white">
                      <div class="cover">
                        <div class="inner">Prop 1:1</div>
                      </div>
                    </div>
                  </div>
                  <div class="col col-25">
                    <div class="prop prop-2-1 white">
                      <div class="cover">
                        <div class="inner">Prop 2:1</div>
                      </div>
                    </div>
                  </div>
                  <div class="col col-25">
                    <div class="prop prop-4-3 white">
                      <div class="cover">
                        <div class="inner">Prop 4:3</div>
                      </div>
                    </div>
                  </div>
                  <div class="col col-25">
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
        <section class="section-white">
          <div class="limit">
            <div class="inner inner-2">
              <div class="content">
                <h2>Mostrar en scroll</h2>
                <p>Display scroll = dscroll</p>
                <h4>Jade:</h4>
                <pre>.prop.gray.dscroll
</pre>
                <h4>Demos:</h4>
                <div class="cols">
                  <div class="col col-25">
                    <article class="prop gray dscroll"></article>
                  </div>
                  <div class="col col-25">
                    <article class="prop gray dscroll"></article>
                  </div>
                  <div class="col col-25">
                    <article class="prop gray dscroll"></article>
                  </div>
                  <div class="col col-25">
                    <article class="prop gray dscroll"></article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="section-lighter">
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
			.col.col-25
				| Contenido
			.col.col-25
				| Contenido
			.col.col-25
				| Contenido
			.col.col-25
				| Contenido
			.col.col-25
				| Contenido
			.col.col-25
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
                      <div class="prop gray">
                        <div class="cover">
                          <div class="va center">1</div>
                        </div>
                      </div>
                    </div>
                    <div class="col col-25">
                      <div class="prop gray">
                        <div class="cover">
                          <div class="va center">2</div>
                        </div>
                      </div>
                    </div>
                    <div class="col col-25">
                      <div class="prop gray">
                        <div class="cover">
                          <div class="va center">3</div>
                        </div>
                      </div>
                    </div>
                    <div class="col col-25">
                      <div class="prop gray">
                        <div class="cover">
                          <div class="va center">4</div>
                        </div>
                      </div>
                    </div>
                    <div class="col col-25">
                      <div class="prop gray">
                        <div class="cover">
                          <div class="va center">5</div>
                        </div>
                      </div>
                    </div>
                    <div class="col col-25">
                      <div class="prop gray">
                        <div class="cover">
                          <div class="va center">6</div>
                        </div>
                      </div>
                    </div>
                    <div class="col col-25">
                      <div class="prop gray">
                        <div class="cover">
                          <div class="va center">7</div>
                        </div>
                      </div>
                    </div>
                    <div class="col col-25">
                      <div class="prop gray">
                        <div class="cover">
                          <div class="va center">8</div>
                        </div>
                      </div>
                    </div>
                    <div class="col col-25">
                      <div class="prop gray">
                        <div class="cover">
                          <div class="va center">9</div>
                        </div>
                      </div>
                    </div>
                    <div class="col col-25">
                      <div class="prop gray">
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
        </section>
        <section class="section-white">
          <div class="limit">
            <div class="inner inner-2">
              <div class="content">
                <h2>Youtube</h2>
                <div class="cols">
                  <div class="col col-50">
                    <div data-id="y2cQvZPX3OY" class="youtube"><img src="http://lorempixel.com/640/360/technics/4" alt="Base Front"/>
                      <button class="youtube-play"><span class="fa fa-play"></span></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="section-dark">
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
                    <li><span class="fa fa-home"></span>Avenida del Parque 4161, oficina 103, Ciudad Empresarial</li>
                    <li><a href="tel:+56223935367"><span class="fa fa-phone"></span>+(56) 2 2393 5367</a></li>
                    <li><a href="mailto:contacto@fprogreso.org"><span class="fa fa-envelope"></span>contacto@fprogreso.org</a></li>
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
  </div>
  <!--footer-->
</body></html>