# Proyecto TPV - Front-end - Angular
#### Back-end con Tecnologías de Código Abierto (SPRING)
#### [Máster en Ingeniería Web por la U.P.M.](http://miw.etsisi.upm.es)
[![Build Status](https://travis-ci.org/miw-upm/betca-tpv-angular.svg?branch=develop)](https://travis-ci.org/miw-upm/betca-tpv-angular)

> Proyecto Front-end completo para el uso de la tecnología Angular-Spring.  
> Web en acción: [https://betca-tpv-angular.herokuapp.com](https://betca-tpv-angular.herokuapp.com).  
> El Back-end se desarrolla en Spring en el proyecto [betca-tpv-spring](https://github.com/miw-upm/betca-tpv-spring). Documentación del API [Swagger](https://betca-tpv-spring.herokuapp.com/api/v0/swagger-ui.html)  
> Ejecución en local:
> * Se debe tener arrancado el motor de MongoDB: `mongodb://localhost:27017/tpv`  
> * Se debe arrancar el **API** en linea de comando, mediante: `> mvn clean spring-boot:run`  
> * Se debe arrancar **Angular**:  
>   * Perfil **dev**:`> ng serve`. [http://localhost:4200/](http://localhost:4200/)  
>   * Perfil **prod** en local: `> ng serve --prod` , en este caso ataca al API de Heroku
>   * perfil **prod** mediante **Express**: `> ng build --prod` & `> node server.js`, en este caso ataca al API de Heroku

This project was generated with  
* Node version 8.15.0
* Npm version: 6.7.0
* [Angular CLI](https://github.com/angular/angular-cli) version 7.3.0.

## Presentación
Este proyecto es la práctica de Angular desarrollada de forma colaborativa por todos los alumnos. Se parte de la versión `core`, ya implementada, y se pretende ampliar con un conjunto de mejoras.  

Un **T**erminal **P**unto de **V**enta es un sistema informático que gestiona el proceso de venta mediante una interfaz accesible para los vendedores o compradores.
Permite la creación e impresión del recibo ticket o factura de venta —con los detalles de las referencias y precios— de los artículos vendidos, actualiza los cambios en el nivel de existencias de mercancías (STOCK) en la base de datos...

## Video explicativo
https://youtu.be/ozgDhEO18XQ

## Tecnologías necesarias
`Angular` `Typescript` `HTML` `CSS`

### Clonar el proyecto
 Clonar el repositorio en tu equipo, **mediante consola**:
```sh
> cd <folder path>
> git clone https://github.com/miw-upm/betca-tpv-angular
> npm install
```
Importar el proyecto mediante **WebStorm**
1. **Open**, y seleccionar la carpeta del proyecto

## Ecosistema
`Git` `GitHub` `Travis-CI` `Heroku`
> Se utilizará un flujo de trabajo ramificado (_**Git Workflow**_).
> Una **historia** por **alumno**, organizada como un **proyecto** de tipo **Automated kanban**.
> Cada **historia** se dividirá en **tareas**, cada **tarea** será una **issue#**, que será el nombre de la **rama**.  
> **Se recomienda aportaciones frecuentes a la rama `develop`** :sweat_smile:

### Calidad del código
* Código formateado y bien organizado
   * Herramienta del IDE
   * Líneas en blanco
   * Ordenar métodos
   * Repasar nombres de clases, métodos, atributos, parámetros y variables
* Sencillez del código: **You aren’t gonna need it (YAGNI)**
   * Simplificar el código, código simple, pocas líneas efectivas...
   * Estructuras anidadas: <3
   * Complejidad ciclomática: <8-12
* Métricas
   * Paquete: <20 clases
   * Clases: <500-200 líneas, <20 métodos
   * Métodos: <3-5 parámetros, <15 líneas
* Antipatrones
   * Copy & paste: pensar el reparto de responsabilidades
   * Blind faith (Fe ciega): lanzar test y después de subir develop, **mirar TRAVIS-ci** [![Build Status](https://travis-ci.org/miw-upm/betca-tpv-angular.svg?branch=develop)](https://travis-ci.org/miw-upm/betca-tpv-angular)
   * Poltergeist: eliminar código muerto
   * Blob: una clase tiene una responsabilidad
   * Lava flow: refactorizar, ordenar, simplificar...

### Metodología de trabajo
:one: Organización de la **historia** y **tareas** en el proyecto de GitHub mediante **notas**. Elegir la **nota** a implementar, convertirla en **issue#** y configurarla  
:two: Mirar el estado del proyecto [![Build Status](https://travis-ci.org/miw-upm/betca-tpv-angular.svg?branch=develop)](https://travis-ci.org/miw-upm/betca-tpv-angular) en [Travis-CI](https://travis-ci.org/miw-upm/betca-tpv-angular/builds)  
:three: Sincronizarse con las ramas remotas, 
```sh
> git fetch --all
```
Y si fuera necesario, actualizar la rama **develop** con la remota **origin/develop**:
```sh
> git checkout develop
> git pull origin develop
```
:four: Si se comienza la tarea, se crea la rama y se activa
```sh
> git checkout -b issue#xx
```
 Y si se continúa, y se necesitara actualizar la rama **issue#** con las nuevas incorporaciones de **develop** :
```sh
> git checkout issue#xx
> git merge -m "Merge develop into issue #xx" develop
```
:five: Programar la tarea o una parte de ella, lanzar **TODOS LOS TESTS** y asegurarse que no hay errores. Finalmente, sincronizarse con las ramas remotas:
 ```sh
> git fetch --all
```
Y si necesitamos actualizarnos, se repite el paso :four:  
:six: Actualizar **develop** con nuestro cambios:
```sh
> git checkout develop
> git merge --no-ff -m "Merge issue #xx into develop" issue#xx
```
:seven: Resolver los conflictos, observar el flujo de ramas, y si todo ha ido bien... subirlo 
```sh
> git push --all
 ```
:eight: Si la tarea continua, volver a activar la **rama issue#xx**:
```sh
> git checkout issue#xx
 ```

 ### Travis-CI
Integración continua con **Travis-CI**. Se despliega para ejecución de los test Unitarios y de Integración.
* En el fichero `.travis.yml`:
```yaml
language: node_js
node_js:
  - '8'
addons:
  chrome: stable
script:
  - ng test --watch=false --no-progress --browsers=ChromeHeadlessNoSandbox
```
* Actualizar el fichero `karma.conf.js` con el contenido:
```js
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    }
```

### Heroku
Se realiza un despliegue en **Heroku** .  
En la cuenta de **Heroku**, en la página `-> Account settings -> API Key`, se ha obtenido la `API KEY`.  
En la cuenta de **Travis-CI**, dentro del proyecto, en `-> More options -> Settings`, se ha creado una variable de entorno llamada `HEROKU` cuyo contenido es la **API key** de **Heroku**.  

* En el fichero `package.json`:
```json
{
  "scripts": {
    "postinstall": "ng build --prod",
    "start": "node server.js"
  },
  "engines": {
    "node": "8.15.0",
    "npm": "6.7.0"
  }  
}
```
* En el fichero `.travis.yml`:
```yaml
# Deploy https://betca-tpv-angular.herokuapp.com
deploy:
  provider: heroku
  api_key:
    secure: $HEROKU
  on:
    branch: master
```

## Arquitectura

### Modulos
![](https://github.com/miw-upm/betca-tpv-angular/blob/develop/docs/app-module.png)

### Plantilla de la arquitectura de un componente
![](https://github.com/miw-upm/betca-tpv-angular/blob/develop/docs/app-template.png)
```typescript
export interface LocalModel {
  code: string;
  description: string;
  retailPrice: number;
}
```

#### Responsabilidades

###### Vista (HTML)
> Organiza la vista.  
> No procesa cuestiones de vista, las delega en el componente.
Como exceptión se permite un proceso muy simple, por ejemplo deshabilitar un botón por no tener valor de entrada  

##### Componente
> Obtener los datos a traves del `Servicio Local`.   
> Procesar exclusivamente para preparar la vista.   
> NO realiza procesos de negocio NI realiza peticiones al API, lo delega en el servicio Local 


##### Servicio
> Realiza las peticiones del API a traves del `servicio Http` de Core.  
> Si hay peticiones repetidas entre varios servicios, se delega a un servicio más genérico situado en una carpeta `shared`

### Servicios (CORE)
![](https://github.com/miw-upm/betca-tpv-angular/blob/develop/docs/core-module.png)

### Jerarquía de componentes y servicios
![](https://github.com/miw-upm/betca-tpv-angular/blob/develop/docs/app-hierarchy.png)

### Vista de pantallas
![](https://github.com/miw-upm/betca-tpv-angular/blob/develop/docs/app-view.png)

## Autenticación
Se plantean mediante **Basic Auth** para logearse y obtener un **API Key** o **token** de tipo **JSON Web Tokens (JWT)**. Uso del **Bearer APIkEY** para el acceso a los recursos.  
Para obtener el **API Key** se accede al recurso: `POST \users\token`, enviando por **Basic auth** las credenciales, van en la cabecera de la petición
Para el acceso a los recursos, se envia el **token** mediante **Bearer auth**, también en la cabecera de la petición
> Authorization = Basic "user:pass"<sub>Base64</sub>  
> Authorization = Bearer "token"<sub>Base64</sub>  

```typescript
export interface Token {
  token: string;
  mobile?: number;
  name?: string;
  roles?: Array<Role>;
}
```
```typescript
import {JwtHelperService} from '@auth0/angular-jwt';
...
@Injectable()
export class HttpService {
  private token: Token;
  ...
  authBasic(mobile: number, password: string): HttpService {
    return this.header('Authorization', 'Basic ' + btoa(mobile + ':' + password));
  }
  login(mobile: number, password: string, endPoint: string): Observable<any> {
    return this.authBasic(mobile, password).post(endPoint).pipe(
      map(token => {
        this.token = token;
        this.token.mobile = new JwtHelperService().decodeToken(token.token).user;
        this.token.name = new JwtHelperService().decodeToken(token.token).name;
        this.token.roles = new JwtHelperService().decodeToken(token.token).roles;
      }), catchError(error => {
        return this.handleError(error);
      })
    );
  }
  ...
  private createOptions(): any {
    if (this.token !== undefined) {
      this.header('Authorization', 'Bearer ' + this.token.token);
    }
  ...
  }
  ...
}
```
### Organización del código

### Diálogos
Genéricos, el _**dialog**_ devuelve los datos y se gestiona su evolución en la llamada
```typescript
deleteDb() {
  this.dialog.open(CancelYesDialogComponent).afterClosed().subscribe(
    result => {
      if (result) {
        this.adminsService.deleteDb();
      }
    });
}
```
```html
<mat-dialog-actions>
  <button mat-raised-button mat-dialog-close cdkFocusInitial color="primary">Cancel</button>
  <button mat-raised-button [mat-dialog-close]="true">Yes</button>
</mat-dialog-actions>
```
```typescript
@Component({
  templateUrl: 'cancel-yes-dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class CancelYesDialogComponent {
}
```
Específicos, el _**dialogo**_ se encarga de llamar al servicio
```typescript
closeCashier() {
  this.dialog.open(CashierCloseDialogComponent);
}
```
```html
<mat-dialog-actions>
    <button mat-raised-button mat-dialog-close color="primary" cdkFocusInitial>Cancel</button>
    <button mat-raised-button mat-dialog-close (click)="close()">Close Cashier</button>
</mat-dialog-actions>
```
```typescript
export class CashierCloseDialogComponent {
    cashierClosure: CashierClosure = { finalCash: 0, salesCard: 0, comment: '' };
    constructor(private cashierService: CashierService) {}
    close() {
        this.cashierService.close(this.cashierClosure);
    }
}
```
### Observadores
Con un ciclo de vida sin cierre. El sujeto observado, pueden cambiar por acciones en otro lugar de la aplicación a lo largo del tiempo. Debemos darnos de baja cuando se destruya el componente.
```typescript
this.subscription = this.cashierService.lastObservable().subscribe(
  data => {
    this.cashierClosed = data.closed;
    if (data.closed) {
      this.router.navigate([HomeComponent.URL, CashierClosedComponent.URL]);
    } else {
      this.router.navigate([HomeComponent.URL, CashierOpenedComponent.URL]);
    }
  }
);
```
```typescript
ngOnDestroy(): void {
  this.subscription.unsubscribe();
}
```
Peticiones asíncronas al API, se cierran automáticamente al finalizar la petición
```typescript
seedDb(file: File): void {
  const formData: FormData = new FormData();
  formData.append('file', file, file.name);
  this.httpService.successful().post(AdminsService.END_POINT + AdminsService.DB, formData).subscribe(() => {
  });
}
```
Proceso intermedio de los datos
```typescript
  login(mobile: number, password: string, endPoint: string): Observable<any> {
    return this.authBasic(mobile, password).post(endPoint).pipe(
      map(token => {
        this.token = token;
        this.token.mobile = new JwtHelperService().decodeToken(token.token).user;
        this.token.name = new JwtHelperService().decodeToken(token.token).name;
        this.token.roles = new JwtHelperService().decodeToken(token.token).roles;
      }), catchError(error => {
        return this.handleError(error);
      })
    );
  }
```

