import React from "react";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import logo1 from '../img/_19850dc1-c22c-4629-a862-f2e4853ec30e.jpg';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import Link from '@mui/material/Link';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PasswordIcon from '@mui/icons-material/Password';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import "../style/vntlogin.css"

function Ventanalogin() {

    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {

        try {
            const response = await fetch('http://localhost:3200/validacionLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    usuario,
                    contrasena
                })
            });

            const data = await response.json();

            if (response.status === 200) {
                if (data.tipoUsuario === 'administrador') {
                    Swal.fire({
                        icon: "success",
                        title: "Perfecto",
                        text: "Credenciales Correctas!",
                        footer: 'Bienvenido Administrador'
                    });
                    navigate('/ventanaregistro/');
                }
                else if (data.tipoUsuario === 'cliente') {
                    Swal.fire({
                        icon: "success",
                        title: "Perfecto",
                        text: "Credenciales Correctas!",
                        footer: 'Bienvenido Cliente'
                    });
                    navigate(`/ventanainforme/${data.idUsuario}/${data.nombreUsuario}/${data.marcaTelUsuario}/
                        ${data.requerimientoUsuario}/${data.estadoEquipoUsuario}/${data.accesoriosUsuario}/
                        ${data.pagoUsuario}`);
                }
            }
            else if (response.status === 404) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Credenciales incorrectas!",
                    footer: 'Vuelve a Revisar'
                });

            }
        } catch (error) {
            setMensaje('Error al iniciar sesión');
        }
    };

    useEffect(() => {
        if (mensaje) {
            alert(mensaje);
        }
    }, [mensaje]);


    return (
        <div className="container-vntLogin">
            <Container>
                <Box sx={{ height: '100vh' }}>
                    <div className="cabecera-login">
                        <h1>Device Doctor</h1>
                    </div>
                    <br />
                    <div className="login-izq">
                        <div className="logo-empresa">
                            <img src={logo1} alt="" width="400"></img>
                        </div>
                        <br />
                        <div className="saludo">
                            <h2>Bienvenido de Regreso!</h2>
                            <br />
                            <p>Usa tus Credenciales para Loguearte</p>
                        </div>
                    </div>

                    <div className="login-der">
                        <div className="cabecera-singin">
                            <h1>Sing In</h1>
                        </div>
                        <div className="iconos-singin">
                            <Link href="#" className="icon"><PictureAsPdfIcon sx={{ fontSize: 40, margin: '0 10px', color: '#ff6361' }} /></Link>
                            <Link href="#" className="icon"><FacebookIcon sx={{ fontSize: 40, margin: '0 10px', color: '#ff6361' }} /></Link>
                            <Link href="#" className="icon"><GitHubIcon sx={{ fontSize: 40, margin: '0 10px', color: '#ff6361' }} /></Link>
                            <Link href="#" className="icon"><InstagramIcon sx={{ fontSize: 40, margin: '0 10px', color: '#ff6361' }} /></Link>
                        </div>
                        <br />
                        <div className="subtitulo">
                            <span>O Usa tu User/Password</span>
                        </div>
                        <br />
                        <div className="form-singin">
                            <FormControl>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                    <AssignmentIndIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '8px' }} />
                                    <TextField id="usuario" label="Usuario" variant="filled" value={usuario}
                                        onChange={(e) => setUsuario(e.target.value)}
                                        sx={{ input: { color: 'black', backgroundColor: '#fff', width: '200px', height: '10px' } }} />
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                    <PasswordIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '8px' }} />
                                    <TextField id="contra" label="Contraseña" type="password" variant="filled" value={contrasena}
                                        onChange={(e) => setContrasena(e.target.value)}
                                        sx={{ input: { color: 'black', backgroundColor: '#fff', width: '200px', height: '10px' } }} />
                                </Box>
                            </FormControl>
                            <br />
                            <div className="boton-singin">
                                <Button className="btn-registrar" variant="contained" color="success" onClick={handleLogin}>
                                    Sing In
                                </Button>
                            </div>
                            <br />
                            <br />
                        </div>
                    </div>

                </Box>
            </Container>
        </div>
    );

}

export default Ventanalogin;