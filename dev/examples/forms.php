<?php require("header.php"); ?>


<div class="limit">
    <div class="inner">

        <form method="POST" class="controls controls-nolayout" action="">
          
            <div class="errorHeader"></div>
            <input type="hidden" id="fb" name="fb"/>

            <div class="control">
                <div class="control-name">* Email</div>
                <div class="control-value"><input class="text-input" name="email" type="email" value="<?php if(isset($_POST["email"])){ echo $_POST["email"]; }else{ echo $_SESSION['user_data']['email']; } ?>" /></div>
            </div>

             <div class="control">
                <div class="control-name">* Nombre</div>
            	<div class="control-value"><input class="text-input" name="nombre" type="text" value="<?php if(isset($_POST["nombre"])){ echo $_POST["nombre"]; }else{ echo $_SESSION['user_data']['first_name']; } ?>" /></div>
            </div>

            <div class="control">
                <div class="control-name">* Apellido</div>
                <div class="control-value"><input type="text" name="apellido" value="<?php if(isset($_POST["apellido"])){ echo $_POST["apellido"]; }else{ echo $_SESSION['user_data']['last_name']; } ?>" /></div>
            </div>

            <div class="control">
                <div class="control-name">* RUT</div>
                <div class="control-value"><input type="text" name="rut" class="rut" value="<?php echo $_POST["rut"] ?>" /></div>
            </div>

            <div class="control">
                <div class="control-name control-name-2lines">* Fecha de Nacimiento</div>
                <div class="control-value">
                    <!--<input type="text" name="nacimiento" value="<?php echo $_POST["nacimiento"] ?>" />-->

                    <div class="cols cols-halfsep">
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
                <div class="control-name">* Teléfono</div>
                <div class="control-value">
                    <div class="cols cols-halfsep">
                        <div class="col col-20">
                            <div class="col-inner"><input type="text" maxlength="2" name="prefix" value="<?php echo $_POST["prefix"] ?>" /></div>
                        </div>
                        <div class="col col-80">
                            <div class="col-inner"><input type="text" maxlength="8" name="telefono" value="<?php echo $_POST["telefono"] ?>" /></div>
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
                <div class="control-value"><input type="text" name="ciudad" class="optional" value="<?php echo $_POST["ciudad"] ?>" /></div>
            </div>
            
            <div class="control">
                <div class="control-name">* Contraseña</div>
                <div class="control-value"><input type="password" name="pass" value="<?php echo $_POST["pass"] ?>" /></div>
            </div>

            <div class="control">
                <div class="control-name control-name-2lines">* Confirmar Contraseña</div>
                <div class="control-value"><input type="password" name="pass2" value="<?php echo $_POST["pass2"] ?>" data-repeat="pass" /></div>
            </div>

            <div class="control">
                <div class="control-name">* Sexo</div>
                <div class="control-value">
                    <label class="inline"><input type="radio" name="sexo" value="Male" <?php if($_POST["sexo"]=="Male"){ echo "checked"; } ?> /> Masculino</label> 
                    <label class="inline"><input type="radio" name="sexo" value="Female" <?php if($_POST["sexo"]=="Female"){ echo "checked"; } ?> /> Femenino</label>
                </div>
            </div>

            <div class="control">
                <div class="control-name"></div>
                <div class="control-value">
                    <label><input type="checkbox" name="optin" value="1" class="optional" <?php if($_POST["optin"]){ echo "checked"; } ?> /> Acepto</label>
                </div>
            </div>


            <div class="control">
                <div class="control-name"></div>
                <div class="control-value">
                    <input name="adduser" type="submit" class="submit button button-primary" value="Registrame" />
                    <input name="action" type="hidden" value="adduser" />
                </div>
            </div>


        </form>


    </div>
</div>
    


<?php require("footer.php"); ?>