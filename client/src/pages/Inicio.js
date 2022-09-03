import React from 'react';
 
function Inicio() {
  return (
    <div className='inicio'>
 
      <div class="containter">
        <div class="row align-items-center">
          <div class="col">
            <div class="card w-150">
              <div class="card-body text-center">
                <p class="card-text ">Inicio de sesión</p>
                <select class="fs-3" name="usuarios">
                  <option value="1">Antonio Marco</option>
                  <option value="2">Gael Morales</option>
                  <option value="3">Rogelio Manriquez</option>
                  <option value="4">Fernando Vargas</option>
                  <option value="5">Francisco Ledesma</option>
                  <option value="6">Eduardo Anda</option>
                  <option value="7">Diego Armando</option>
                  <option value="8">Isaac Antonio</option>
                  <option value="9">Juan Aldaco</option>
                  <option value="10">Elizabeth Cuellar</option>
                  <option value="11">Yeyo Ramirez</option>
                  <option value="12">Raul Silva</option>
                  <option value="13">Yair Alejandro</option>

                </select>
                <br/>
                <a href="./productos" class="btn btn-primary active" role="button" data-bs-toogle="button" aria-pressed="true">Acceder</a>
              </div>
            </div>
          </div>
        </div>
      </div>  
 
    </div>
  )
}
 
export default Inicio