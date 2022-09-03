-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb`;

-- -----------------------------------------------------
-- Table `mydb`.`categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`categorias` (
  `categoria_id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`categoria_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`productos` (
  `producto_id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(45) NOT NULL,
  `p_venta` INT NOT NULL,
  `p_compra` INT NOT NULL,
  `fecha` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `cantidad` INT NOT NULL,
  `activo` TINYINT NOT NULL,
  PRIMARY KEY (`producto_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`niveles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`niveles` (
  `nivel_id` INT NOT NULL AUTO_INCREMENT,
  `nivel` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`nivel_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`usuarios` (
  `usuario_id` INT NOT NULL AUTO_INCREMENT,
  `nivel_id` INT NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `usuario` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`usuario_id`),
  INDEX `nivel_id_idx` (`nivel_id` ASC),
  CONSTRAINT `nivel_id`
    FOREIGN KEY (`nivel_id`)
    REFERENCES `mydb`.`niveles` (`nivel_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`compras`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`compras` (
  `compra_id` INT NOT NULL AUTO_INCREMENT,
  `producto_id` INT NOT NULL,
  `usuario_id` INT NOT NULL,
  `fecha`  DATETIME DEFAULT CURRENT_TIMESTAMP,
  `cantidad` INT NOT NULL,
  `proveedor` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`compra_id`),
  INDEX `usuario_id` (`usuario_id` ASC),
  INDEX `producto_id` (`producto_id` ASC),
  CONSTRAINT `producto_id`
    FOREIGN KEY (`producto_id`)
    REFERENCES `mydb`.`productos` (`producto_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `usuario_id`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `mydb`.`usuarios` (`usuario_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`prodcat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`prodcat` (
  `categoria_id` INT NOT NULL,
  `producto_id` INT NOT NULL,
  PRIMARY KEY (`categoria_id`, `producto_id`),
  INDEX `producto_id_prodcat` (`producto_id` ASC),
  CONSTRAINT `categoria_id_prodcat`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `mydb`.`categorias` (`categoria_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `producto_id_prodcat`
    FOREIGN KEY (`producto_id`)
    REFERENCES `mydb`.`productos` (`producto_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


#Ticket 23
#Llenar la tabla Categoría con al menos 7 categorías.
INSERT INTO categorias(nombre, descripcion) 
	VALUES('Alimentos y bebidas','Comida empaquetada y bebidas empaquetadas'),
			('Libros','Libros físicos'),
            ('Electrónicos','Dispositivos electrónicos'),
            ('Cómputo y Tablets','Tablets y computadoras'),
            ('Juegos y juguetes','Juguetes para niños y adolescentes'),
            ('Música','CDs de música y álbumes'),
            ('Herramientas','Herramientas para hogar, taller, etc.'),
            ('Oficina y papelería','Papel, útiles escolares, etc.'),
            ('Hogar y cocina','Elementos decorativos'),
            ('Videojuegos','Software y periféricos para juegos');

#Ticket 22
#Llenar la tabla Nivel con los niveles correspondientes
INSERT INTO niveles(nivel, descripcion) 
	VALUES('Administrador', 'Permisos CRUD'), ('Gerente', 'Permisos RUD (UD con auth)'), ('Almacenista', 'Permisos R');


#Ticket 24
#Llenar la tabla Usuarios con al menos 15 registros (favor de usar diferentes niveles de usuarios y máximo dos como administrador).
INSERT INTO usuarios(nivel_id, password, usuario) 
	VALUES(3, '9daN7>CM', 'Antonio Marco'),
			(3, '3D5u}Sx]c', 'Gael Morales'),
			(3, '}C?wZQ9Wp', 'Rogelio Manriquez'),
			(3, 'zu8$/Z2,S', 'Misael Ramirez'),
			(3, '%ENByBZ9}', 'Fernando Vargas'), 
			(3, 'iQ3]Gk[u@', 'Francisco Ledesma'),
			(3, ']9((Mfd[`', 'Eduardo Anda'),
			(2, 'mFf+j~2=:', 'Diego Armando'),
			(2, 'hAd4@Z#L', 'Isaac Antonio'),
			(2, '?nU9\s+2K', 'Juan Aldaco'),
			(2, 'x!*D46%E/', 'Elizabeth Cuellar'),
			(2, 'C]k8Z4hY;', 'Yeyo Ramirez'),
			(2, 'fVp>P82t$', 'Raul Silva'),
			(1, 'K7^g]&~n=', 'Braulio Mac'),
			(1, 'Uhdk/*~3u', 'Yair Alejando');



#Ticket 25
#Llenar la tabla Productos con al menos 30 registros (utilizando precios de mercado/creíbles).
INSERT INTO productos(nombre, descripcion, p_venta, p_compra, activo, cantidad) 
VALUES('Jugo de manzana', 'Jugo de manzana en envase', 100, 90, true, 10),
			('Atún en lata', 'Atún en lata 150gr', 200, 190, false, 10),
            ('Nescafe Decaf', 'Café soluble 170gr', 90, 60, false, 10),
            ('It', 'Libro físico pasta dura It', 300, 290, true, 10),
            ('El principito', 'Libro físico pasta suave', 400, 390, true, 10),
            ('Berserk', 'Libro físico pasta dura', 680, 590, true, 10),
            ('Poco X3 Pro', 'Versión 8/256 SD860', 5000, 4000, true, 10),
            ('Ventilador de piso', 'Ventilador 3 velocidades', 500, 300, true, 10),
            ('Refrigerador Samsung', 'Refrigerador 10ft 100LT', 10000, 9000, true, 10),
            ('HUAWEI MateBook D 15', '15.6" 512/8 R5-3500', 9000, 7800, true, 10),
			('RTX 3070 Ti Gaming OC 8G', 'Gigabyte Windforce 3X', 23500, 19500, true, 10),
            ('Radeon RX 6900 XT', '16 GB GDDR6', 21600, 18700, true, 10),
			('Funko POP! Mandalorian', 'Figura Funko POP!', 350, 250, false, 10),
            ('Funko POP! Nezuko', 'Figura Funko POP!', 450, 300, false, 10),
			('Funko POP! Nayeon', 'Figura Funko POP!', 500, 350, false, 10),
            ('Dr. Strange Marvel L. S.', 'Figura Dr. Strange Marvel', 600, 490, true, 10),
            ('Formula of Love', 'Formula of Love - TWICE', 600, 450, true, 10),
            ('Im Nayeon', 'Im Nayeon 1st album', 500, 350, true, 10),
            ('The Album', 'The Album - BLACKPINK', 500, 345, true, 10),
            ('Regulador línea blanca', 'Regulador de voltaje', 1200, 950, true, 10),
            ('Smart Plug', 'Smart Plug Xiaomi', 300, 240, true, 10),
            ('Sierra para metales', 'Sierra para metales Lenox', 600, 350, true, 10),
            ('100 Super tips Crayola', '100 super tips crayola', 500, 400, true, 10),
            ('Cartucho Original de Tinta', 'Tinta para impresora', 280, 200, true, 10),
            ('Casio Classwiz FX-991', 'Calculadora científica', 450, 320, true, 10),
            ('Freidora de Aire', 'Easy Fry T-Fal', 1800, 1400, true, 10),
            ('Tostador de pan', 'Tostador TT1A18MX', 400, 280, true, 10),
            ('Parrilla Inducción Eléctrica', 'RCA RC-12A3', 1250, 1100, true, 10),
            ('Logitech G920', 'Volante y pedales Logitech', 4000, 3500, true, 10),
            ('Pokémon Legends: Arceus', 'Standard ed. switch', 280, 200, true, 10),
            ('Nintendo Switch 32GB 1.1', 'Consola 32GB Neon', 6500, 5500, true, 10),
			('Xbox Series S', '512GB digital', 4500, 3900, true, 10),
            ('Xbox Series X', '1TB ver. minecraft', 9500, 8000, true, 10),
            ('Playstation 5', 'Digital 1TB', 10250, 8800, true, 10),
			('Echo Dot 4ta Gen', 'Color negro Alexa', 900, 650, true, 10),
            ('Fire TV Stick', 'Dispositivo de streaming', 700, 550, true, 10);

#Ticket 27
#Llenar tabla ProdCat con al menos 60 registros (utilizando datos congruentes entre Categoría y Productos). 
INSERT INTO prodcat(categoria_id, producto_id)
VALUES(8,1),
(8,2),
(8,3),
(1,4),
(1,5),
(1,6),
(2,7),
(2,8),
(7,8),
(2,9),
(8,9),
(2,10),
(3,10),
(3,11),
(9,11),
(3,12),
(9,12),
(4,13),
(9,13),
(4,14),
(9,14),
(4,15),
(9,15),
(5,16),
(5,17),
(5,18),
(2,19),
(6,19),
(7,19),
(2,20),
(7,20),
(6,21),
(7,22),
(7,23),
(6,24),
(7,24),
(2,25),
(8,25),
(2,26),
(8,26),
(2,27),
(8,27),
(2,28),
(9,28),
(9,29),
(9,30),
(2,31),
(9,31),
(2,32),
(9,32),
(2,33),
(9,33), 
(2,34),
(7,34),
(8,34),
(2,35),
(7,35),
(8,35),
(4,36),
(9,36);


#Ticket 26
#Llenar tabla Compras con al menos 30 registros (utilizando datos congruentes con Productos y Usuarios).
INSERT INTO compras(producto_id, usuario_id, cantidad, proveedor)
	VALUES(1, 3, 10, 'Proveedor 1'),
			(2, 3, 10, 'Proveedor 2'),
            (3, 3, 10, 'Proveedor 3'),
            (4, 3, 10, 'Proveedor 4'),
            (5, 3, 10, 'Proveedor 5'),
            (6, 3, 10, 'Proveedor 1'),
			(7, 3, 10, 'Proveedor 2'),
            (8, 3, 10, 'Proveedor 3'),
            (9, 3, 10, 'Proveedor 4'),
            (10, 3, 10, 'Proveedor 5'),
            (11, 3, 10, 'Proveedor 1'),
			(12, 3, 10, 'Proveedor 2'),
            (13, 3, 10, 'Proveedor 3'),
            (14, 3, 10, 'Proveedor 4'),
            (15, 3, 10, 'Proveedor 5'),
            (16, 3, 10, 'Proveedor 1'),
			(17, 3, 10, 'Proveedor 2'),
            (18, 3, 10, 'Proveedor 3'),
            (19, 3, 10, 'Proveedor 4'),
            (20, 3, 10, 'Proveedor 5'),
            (21, 3, 10, 'Proveedor 1'),
			(22, 3, 10, 'Proveedor 2'),
            (23, 3, 10, 'Proveedor 3'),
            (24, 3, 10, 'Proveedor 4'),
            (25, 3, 10, 'Proveedor 5'),
            (26, 3, 10, 'Proveedor 1'),
			(27, 3, 10, 'Proveedor 2'),
            (28, 3, 10, 'Proveedor 3'),
            (29, 3, 10, 'Proveedor 4'),
            (30, 3, 10, 'Proveedor 5');