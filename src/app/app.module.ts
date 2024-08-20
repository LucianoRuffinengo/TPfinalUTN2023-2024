import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarLibrosComponent } from './components/listar-libros/listar-libros.component';
import { MostrarLibroComponent } from './components/mostrar-libro/mostrar-libro.component';
import { ListarLibrosPageComponent } from './pages/listar-libros-page/listar-libros-page.component';
import { MostrarLibroPageComponent } from './pages/mostrar-libro-page/mostrar-libro-page.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { CategoriaPageComponent } from './pages/categoria-page/categoria-page.component';
import { LoginComponent } from './components/usuarios-control/login/login.component';
import { AccessManagerComponent } from './components/usuarios-control/access-manager/access-manager.component';
import { DataManagerComponent } from './components/usuarios-control/data-manager/data-manager.component';
import { EliminarComponent } from './components/usuarios-control/eliminar/eliminar.component';
import { ModificacionComponent } from './components/usuarios-control/modificacion/modificacion.component';
import { SignupComponent } from './components/usuarios-control/signup/signup.component';
import { UsuarioMenuComponent } from './components/usuarios-control/usuario-menu/usuario-menu.component';
import { UsuarioPageComponent } from './pages/usuario-page/usuario-page.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ProductoPageComponent } from './pages/producto-page/producto-page.component';
import { CarritoPageComponent } from './pages/carrito-page/carrito-page.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { CompraComponent } from './components/compra/compra.component';
import { CompraPageComponent } from './pages/compra-page/compra-page.component';
import { HttpClientModule } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { AlertaLoginPageComponent } from './pages/alerta-login-page/alerta-login-page.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { AgregarTarjetaPageComponent } from './pages/agregar-tarjeta-page/agregar-tarjeta-page.component';
import { AgregarTarjetaComponent } from './components/agregar-tarjeta/agregar-tarjeta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgradecimientoPageComponent } from './pages/agradecimiento-page/agradecimiento-page.component';
import { FavoritoPageComponent } from './pages/favorito-page/favorito-page.component';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { AdministracionPageComponent } from './pages/administracion-page/administracion-page.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { LoginAdminPageComponent } from './pages/login-admin-page/login-admin-page.component';
import { MostrarUsuariosComponent } from './components/mostrar-usuarios/mostrar-usuarios.component';
import { MostrarUsuariosPageComponent } from './pages/mostrar-usuarios-page/mostrar-usuarios-page.component';
import { HistorialComponent } from './components/historial/historial.component';
import { AutoresComponent } from './components/autores/autores.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { AutoresPageComponent } from './pages/autores-page/autores-page.component';
import { BusquedaPageComponent } from './pages/busqueda-page/busqueda-page.component';
import { Sidebar2Component } from './components/shared/sidebar2/sidebar2.component';
import { EnConstruccionComponent } from './components/en-construccion/en-construccion.component';
import { EnConstruccionPageComponent } from './pages/en-construccion-page/en-construccion-page.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ContactoPageComponent } from './pages/contacto-page/contacto-page.component';
import { NuevoAdminComponent } from './components/nuevo-admin/nuevo-admin.component';
import { NuevoAdminPageComponent } from './pages/nuevo-admin-page/nuevo-admin-page.component';
import { ListarAdminsComponent } from './components/listar-admins/listar-admins.component';
import { ListarAdminsPageComponent } from './pages/listar-admins-page/listar-admins-page.component';
import { MostrarAdminComponent } from './components/mostrar-admin/mostrar-admin.component';
import { MostrarAdminPageComponent } from './pages/mostrar-admin-page/mostrar-admin-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ListarLibrosComponent,
    MostrarLibroComponent,
    NavbarComponent,
    ListarLibrosPageComponent,
    MostrarLibroPageComponent,
    FooterComponent,
    HomeComponent,
    HomePageComponent,
    SidebarComponent,
    CategoriaComponent,
    CategoriaPageComponent,
    LoginComponent,
    SignupComponent,
    AccessManagerComponent,
    ModificacionComponent,
    DataManagerComponent,
    EliminarComponent,
    UsuarioMenuComponent,
    UsuarioPageComponent,
    ProductoComponent,
    ProductoPageComponent,
    CarritoPageComponent,
    CarritoComponent,
    CompraComponent,
    CompraPageComponent,
    AlertaLoginPageComponent,
    FavoritosComponent,
    AgregarTarjetaPageComponent,
    AgregarTarjetaComponent,
    AgradecimientoPageComponent,
    FavoritoPageComponent,
    AdministracionComponent,
    AdministracionPageComponent,
    LoginAdminComponent,
    LoginAdminPageComponent,
    MostrarUsuariosComponent,
    MostrarUsuariosPageComponent,
    HistorialComponent,
    AutoresComponent,
    BusquedaComponent,
    AutoresPageComponent,
    BusquedaPageComponent,
    Sidebar2Component,
    EnConstruccionComponent,
    EnConstruccionPageComponent,
    ContactoComponent,
    ContactoPageComponent,
    NuevoAdminComponent,
    NuevoAdminPageComponent,
    ListarAdminsComponent,
    ListarAdminsPageComponent,
    MostrarAdminComponent,
    MostrarAdminPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
