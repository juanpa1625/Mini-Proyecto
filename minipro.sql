-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-07-2024 a las 22:57:59
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `minipro`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombres` varchar(50) DEFAULT NULL,
  `apellidos` varchar(50) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `dni` varchar(20) DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  `fecha_creacion` varchar(20) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombres`, `apellidos`, `direccion`, `email`, `dni`, `edad`, `fecha_creacion`, `telefono`) VALUES
(1, 'juan', 'De la cruz', 'calle luperon', 'tarea12356@gmail.com', '12356454616', 21, '10/20/2001', '8213215'),
(2, 'pablo', 'De la rosa', 'calle lincoln', 'asignacion123@gmail.com', '12356454616', 21, '10/22/2001', '77898745'),
(3, 'esteban', 'pujols', 'calle duarte', 'ejercicio123@gmail.com', '12356454616', 21, '09/22/2001', '6543540354'),
(4, 'luz', 'torres', 'calle kennedy', 'saludos123@gmail.com', '12356454616', 21, '06/20/2001', '5123987'),
(5, 'kelvin', 'feliz', 'calle flores', 'vega123@gmail.com', '12356454616', 21, '11/07/2001', '40021213210'),
(6, 'robert', 'flete', 'calle estadio', 'roberr3@gmail.com', '12356454616', 21, '12/30/2001', '300582100');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
