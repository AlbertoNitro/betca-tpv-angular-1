# Proyecto TPV - Front-end - Angular
#### Back-end con Tecnologías de Código Abierto (SPRING)
#### [Máster en Ingeniería Web por la U.P.M.](http://miw.etsisi.upm.es)

> Proyecto Front-end completo para el uso de la tecnología Angular-Spring.  
> El Back-end se desarrolla en Spring en el proyecto [betca-tpv-spring](https://github.com/miw-upm/betca-tpv-spring).
> Se debe arrancar el [API]() en linea de comando mediante:
> * A partir del código fuente: `> mvn clean spring-boot:run`
> * A partir del JAR: `> java -jar release.jar`  

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.1.

## Presentación
Este proyecto es la práctica de Angular desarrollada de forma colaborativa por todos los alumnos. Se parte de la versión `core`, ya implementada, y se pretende ampliar con un conjunto de mejoras.  

Un **T**erminal **P**unto de **V**enta es un sistema informático que gestiona el proceso de venta mediante una interfaz accesible para los vendedores o compradores.

Un único sistema informático permite la creación e impresión del recibo ticket o factura de venta —con los detalles de las referencias y precios— de los artículos vendidos, actualiza los cambios en el nivel de existencias de mercancías (STOCK) en la base de datos...
## Video explicativo
https://youtu.be/ozgDhEO18XQ

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

## Metodología

### Dialogos
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






