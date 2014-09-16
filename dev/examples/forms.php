<?php require("header.php"); ?>





<div class="limit">
    <div class="inner">
    
        <div class="content">
            <h1>Forms</h1>
            <h2>Con layout y centrado</h2>
        </div>

        <form method="POST" class="controls controls-layout controls-center" action="">
          
            <div class="control">
                <div class="control-name">Email</div>
                <div class="control-value"><input type="email" name="email" /></div>
            </div>

             <div class="control">
                <div class="control-name">Nombre</div>
                <div class="control-value"><input type="text" name="nombre" /></div>
            </div>

            <div class="control">
                <div class="control-name">RUT</div>
                <div class="control-value"><input type="text" name="rut" class="rut" /></div>
            </div>

            <div class="control">
                <div class="control-name control-name-2lines">Fecha de Nacimiento</div>
                <div class="control-value">

                    <div class="cols cols-halfsep cols-nobp">
                        <div class="col col-33">
                            <div class="col-inner">
                                <select name="bday_d">
                                    <option value="">Día</option>
                                    <?php for($i=1;$i<=31;$i++){ ?>
                                    <option value="<?php echo $i ?>" <?php if($_POST["bday_d"]==$i){ echo "selected"; } ?>><?php echo $i ?></option>
                                    <?php } ?>
                                </select>                                                
                            </div>
                        </div>
                        <div class="col col-33">
                            <div class="col-inner">
                                <select name="bday_m">
                                    <option value="">Mes</option>
                                    <?php
                                        $meses = array("Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic");
                                        foreach($meses as $k=>$mes){
                                            ?><option value="<?= $k+1 ?>" <?php if($k+1==$_POST["bday_m"]){ echo "selected"; } ?>><?= $mes ?></option><?php
                                        }
                                    ?>
                                </select>
                            </div>
                        </div>
                        <div class="col col-33">
                            <div class="col-inner">
                                <select name="bday_y">
                                    <option value="">Año</option>
                                    <?php for($i=date("Y");$i>1900;$i--){ ?>
                                    <option value="<?php echo $i ?>" <?php if($_POST["bday_y"]==$i){ echo "selected"; } ?>><?php echo $i ?></option>
                                    <?php } ?>
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
                            <div class="col-inner"><input type="text" maxlength="2" name="phone_prefix" /></div>
                        </div>
                        <div class="col col-80">
                            <div class="col-inner"><input type="text" maxlength="8" name="phone" /></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="control">
                <div class="control-name">Región</div>
                <div class="control-value">
                    <select name="rid" class="optional">
                        <option value="">Selecciona una región</option>
                        <?php

                            $regiones = array(
                                    "1003077" => "Arica y Parinacota",
                                    "3065" => "Tarapacá",
                                    "3075" => "Antofagasta",
                                    "3073" => "Atacama",
                                    "3071" => "Coquimbo",
                                    "3064" => "Valparaiso",
                                    "3066" => "Metropolitana de Santiago",
                                    "3070" => "Libertador General Bernardo O'Higgins",
                                    "3067" => "Maule",
                                    "3072" => "Biobío",
                                    "3074" => "La Araucanía",
                                    "1003078" => "Los Ríos",
                                    "3069" => "Los Lagos",
                                    "3076" => "Aisén del General Carlos Ibáñez del Campo",
                                    "3068" => "Magallanes y de la Antártica Chilena"
                                );

                            foreach($regiones as $region_id=>$region_name){
                                if($_POST["rid"]==$region_id){
                                    $selected = "selected";
                                }else{
                                    $selected = "";                                                    
                                }
                                echo '<option value="'.$region_id.'" '.$selected.'>'.$region_name.'</option>';
                            }
                        ?>
                    </select>
                </div>
            </div>


            <div class="control">
                <div class="control-name">Ciudad</div>
                <div class="control-value"><input type="text" name="city" class="optional" /></div>
            </div>
            
            <div class="control">
                <div class="control-name">Contraseña</div>
                <div class="control-value"><input type="password" name="pass" /></div>
            </div>

            <div class="control">
                <div class="control-name control-name-2lines">Confirmar Contraseña</div>
                <div class="control-value"><input type="password" name="pass2" data-repeat="pass" /></div>
            </div>

            <div class="control">
                <div class="control-name">Sexo</div>
                <div class="control-value">
                    <label class="inline"><input type="radio" name="sexo" value="Male" /> Masculino</label> 
                    <label class="inline"><input type="radio" name="sexo" value="Female" /> Femenino</label>
                </div>
            </div>

            <div class="control">
                <div class="control-name">Mensaje</div>
                <div class="control-value"><textarea name="message"></textarea></div>
            </div>

            <div class="control">
                <div class="control-name"></div>
                <div class="control-value">
                    <label><input type="checkbox" name="terms" value="1" class="input-terms" /> Acepto</label>
                </div>
            </div>

            <div class="control">
                <div class="control-name"></div>
                <div class="control-value">
                    <input type="submit" class="button button-primary" value="Registrame" />
                </div>
            </div>


        </form>


    </div>
</div>





<div class="limit">
    <div class="inner">
    
        <div class="content">
            <h2>Líquido y centrado:</h2>
        </div>

        <form method="POST" class="controls controls-center" action="">
          
            <div class="control">
                <div class="control-name">Email</div>
                <div class="control-value"><input type="email" name="email" /></div>
            </div>

             <div class="control">
                <div class="control-name">Nombre</div>
                <div class="control-value"><input type="text" name="nombre" /></div>
            </div>

            <div class="control">
                <div class="control-name">RUT</div>
                <div class="control-value"><input type="text" name="rut" class="rut" /></div>
            </div>

            <div class="control">
                <div class="control-name control-name-2lines">Fecha de Nacimiento</div>
                <div class="control-value">

                    <div class="cols cols-halfsep cols-nobp">
                        <div class="col col-33">
                            <div class="col-inner">
                                <select name="bday_d">
                                    <option value="">Día</option>
                                    <?php for($i=1;$i<=31;$i++){ ?>
                                    <option value="<?php echo $i ?>" <?php if($_POST["bday_d"]==$i){ echo "selected"; } ?>><?php echo $i ?></option>
                                    <?php } ?>
                                </select>                                                
                            </div>
                        </div>
                        <div class="col col-33">
                            <div class="col-inner">
                                <select name="bday_m">
                                    <option value="">Mes</option>
                                    <?php
                                        $meses = array("Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic");
                                        foreach($meses as $k=>$mes){
                                            ?><option value="<?= $k+1 ?>" <?php if($k+1==$_POST["bday_m"]){ echo "selected"; } ?>><?= $mes ?></option><?php
                                        }
                                    ?>
                                </select>
                            </div>
                        </div>
                        <div class="col col-33">
                            <div class="col-inner">
                                <select name="bday_y">
                                    <option value="">Año</option>
                                    <?php for($i=date("Y");$i>1900;$i--){ ?>
                                    <option value="<?php echo $i ?>" <?php if($_POST["bday_y"]==$i){ echo "selected"; } ?>><?php echo $i ?></option>
                                    <?php } ?>
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
                            <div class="col-inner"><input type="text" maxlength="2" name="phone_prefix" /></div>
                        </div>
                        <div class="col col-80">
                            <div class="col-inner"><input type="text" maxlength="8" name="phone" /></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="control">
                <div class="control-name">Región</div>
                <div class="control-value">
                    <select name="rid" class="optional">
                        <option value="">Selecciona una región</option>
                        <?php

                            $regiones = array(
                                    "1003077" => "Arica y Parinacota",
                                    "3065" => "Tarapacá",
                                    "3075" => "Antofagasta",
                                    "3073" => "Atacama",
                                    "3071" => "Coquimbo",
                                    "3064" => "Valparaiso",
                                    "3066" => "Metropolitana de Santiago",
                                    "3070" => "Libertador General Bernardo O'Higgins",
                                    "3067" => "Maule",
                                    "3072" => "Biobío",
                                    "3074" => "La Araucanía",
                                    "1003078" => "Los Ríos",
                                    "3069" => "Los Lagos",
                                    "3076" => "Aisén del General Carlos Ibáñez del Campo",
                                    "3068" => "Magallanes y de la Antártica Chilena"
                                );

                            foreach($regiones as $region_id=>$region_name){
                                if($_POST["rid"]==$region_id){
                                    $selected = "selected";
                                }else{
                                    $selected = "";                                                    
                                }
                                echo '<option value="'.$region_id.'" '.$selected.'>'.$region_name.'</option>';
                            }
                        ?>
                    </select>
                </div>
            </div>


            <div class="control">
                <div class="control-name">Ciudad</div>
                <div class="control-value"><input type="text" name="city" class="optional" /></div>
            </div>
            
            <div class="control">
                <div class="control-name">Contraseña</div>
                <div class="control-value"><input type="password" name="pass" /></div>
            </div>

            <div class="control">
                <div class="control-name control-name-2lines">Confirmar Contraseña</div>
                <div class="control-value"><input type="password" name="pass2" data-repeat="pass" /></div>
            </div>

            <div class="control">
                <div class="control-name">Sexo</div>
                <div class="control-value">
                    <label class="inline"><input type="radio" name="sexo" value="Male" /> Masculino</label> 
                    <label class="inline"><input type="radio" name="sexo" value="Female" /> Femenino</label>
                </div>
            </div>

            <div class="control">
                <div class="control-name">Mensaje</div>
                <div class="control-value"><textarea name="message"></textarea></div>
            </div>

            <div class="control">
                <div class="control-name"></div>
                <div class="control-value">
                    <label><input type="checkbox" name="terms" value="1" class="input-terms" /> Acepto</label>
                </div>
            </div>

            <div class="control">
                <div class="control-name"></div>
                <div class="control-value">
                    <input type="submit" class="button button-primary" value="Registrame" />
                </div>
            </div>


        </form>


    </div>
</div>






<div class="limit">
    <div class="inner">
    
        <div class="content">
            <h2>Líquido</h2>
        </div>

        <form method="POST" class="controls" action="">
          
            <div class="control">
                <div class="control-name">Email</div>
                <div class="control-value"><input type="email" name="email" /></div>
            </div>

             <div class="control">
                <div class="control-name">Nombre</div>
                <div class="control-value"><input type="text" name="nombre" /></div>
            </div>

            <div class="control">
                <div class="control-name">RUT</div>
                <div class="control-value"><input type="text" name="rut" class="rut" /></div>
            </div>

            <div class="control">
                <div class="control-name control-name-2lines">Fecha de Nacimiento</div>
                <div class="control-value">

                    <div class="cols cols-halfsep cols-nobp">
                        <div class="col col-33">
                            <div class="col-inner">
                                <select name="bday_d">
                                    <option value="">Día</option>
                                    <?php for($i=1;$i<=31;$i++){ ?>
                                    <option value="<?php echo $i ?>" <?php if($_POST["bday_d"]==$i){ echo "selected"; } ?>><?php echo $i ?></option>
                                    <?php } ?>
                                </select>                                                
                            </div>
                        </div>
                        <div class="col col-33">
                            <div class="col-inner">
                                <select name="bday_m">
                                    <option value="">Mes</option>
                                    <?php
                                        $meses = array("Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic");
                                        foreach($meses as $k=>$mes){
                                            ?><option value="<?= $k+1 ?>" <?php if($k+1==$_POST["bday_m"]){ echo "selected"; } ?>><?= $mes ?></option><?php
                                        }
                                    ?>
                                </select>
                            </div>
                        </div>
                        <div class="col col-33">
                            <div class="col-inner">
                                <select name="bday_y">
                                    <option value="">Año</option>
                                    <?php for($i=date("Y");$i>1900;$i--){ ?>
                                    <option value="<?php echo $i ?>" <?php if($_POST["bday_y"]==$i){ echo "selected"; } ?>><?php echo $i ?></option>
                                    <?php } ?>
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
                            <div class="col-inner"><input type="text" maxlength="2" name="phone_prefix" /></div>
                        </div>
                        <div class="col col-80">
                            <div class="col-inner"><input type="text" maxlength="8" name="phone" /></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="control">
                <div class="control-name">Región</div>
                <div class="control-value">
                    <select name="rid" class="optional">
                        <option value="">Selecciona una región</option>
                        <?php

                            $regiones = array(
                                    "1003077" => "Arica y Parinacota",
                                    "3065" => "Tarapacá",
                                    "3075" => "Antofagasta",
                                    "3073" => "Atacama",
                                    "3071" => "Coquimbo",
                                    "3064" => "Valparaiso",
                                    "3066" => "Metropolitana de Santiago",
                                    "3070" => "Libertador General Bernardo O'Higgins",
                                    "3067" => "Maule",
                                    "3072" => "Biobío",
                                    "3074" => "La Araucanía",
                                    "1003078" => "Los Ríos",
                                    "3069" => "Los Lagos",
                                    "3076" => "Aisén del General Carlos Ibáñez del Campo",
                                    "3068" => "Magallanes y de la Antártica Chilena"
                                );

                            foreach($regiones as $region_id=>$region_name){
                                if($_POST["rid"]==$region_id){
                                    $selected = "selected";
                                }else{
                                    $selected = "";                                                    
                                }
                                echo '<option value="'.$region_id.'" '.$selected.'>'.$region_name.'</option>';
                            }
                        ?>
                    </select>
                </div>
            </div>


            <div class="control">
                <div class="control-name">Ciudad</div>
                <div class="control-value"><input type="text" name="city" class="optional" /></div>
            </div>
            
            <div class="control">
                <div class="control-name">Contraseña</div>
                <div class="control-value"><input type="password" name="pass" /></div>
            </div>

            <div class="control">
                <div class="control-name control-name-2lines">Confirmar Contraseña</div>
                <div class="control-value"><input type="password" name="pass2" data-repeat="pass" /></div>
            </div>

            <div class="control">
                <div class="control-name">Sexo</div>
                <div class="control-value">
                    <label class="inline"><input type="radio" name="sexo" value="Male" /> Masculino</label> 
                    <label class="inline"><input type="radio" name="sexo" value="Female" /> Femenino</label>
                </div>
            </div>

            <div class="control">
                <div class="control-name">Mensaje</div>
                <div class="control-value"><textarea name="message"></textarea></div>
            </div>

            <div class="control">
                <div class="control-name"></div>
                <div class="control-value">
                    <label><input type="checkbox" name="terms" value="1" class="input-terms" /> Acepto</label>
                </div>
            </div>

            <div class="control">
                <div class="control-name"></div>
                <div class="control-value">
                    <input type="submit" class="button button-primary" value="Registrame" />
                </div>
            </div>


        </form>


    </div>
</div>



<?php require("footer.php"); ?>