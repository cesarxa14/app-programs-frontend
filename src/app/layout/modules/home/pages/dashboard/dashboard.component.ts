import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  colors: string[];
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  searchForm: FormGroup;
  minEndDate: string;
  fechaActual = moment().format('YYYY/MM/DD'); // Fecha actual
  fechaTresMesesAntes = moment().subtract(3, 'months').format('YYYY/MM/DD');

  @ViewChild("chart") chart: ChartComponent;
  public chartOptionsStudentByProgram: Partial<ChartOptions>;
  public chartOptionsStudentByPackage: Partial<ChartOptions>;
  public chartOptionsEarningByPackage: Partial<ChartOptions>;
  public chartOptionsEarningByProgram: Partial<ChartOptions>;
  public chartOptionsInfoDemographicsDepartment: Partial<ChartOptions>;
  public chartOptionsInfoDemographicsProvince: Partial<ChartOptions>;
  public chartOptionsInfoDemographicsDistrict: Partial<ChartOptions>;
  public chartOptionsSalesLineTime: Partial<ChartOptions>;
  quantityStudents: number;
  quantityStudentsList: any[] = [];
  quantityStudentsList2: any[] = [];
  earningPackagesList: any[] = [];
  earningProgramList: any[] = [];
  categories: any[] = []; 
  categories2: any[] = []; 
  categories3: any[] = [];
  categories4: any[] = [];
  userByGenderInfo: any;
  totalSalesEarnings: any;
  totalSalesByType: any;
  totalSalesByPaymentMethod: any;
  constructor(
    private dashboardService: DashboardService,
    private _formBuilder: FormBuilder,
  ) {  }

  ngOnInit(): void {
    this.searchForm = this._builderForm();
    this.getQuantityStudent(this.fechaTresMesesAntes, this.fechaActual);
    this.getTotalEarningSales(this.fechaTresMesesAntes, this.fechaActual);
    this.getSalesByTypeVoucher(this.fechaTresMesesAntes, this.fechaActual);
    this.getSalesByPaymentMethod(this.fechaTresMesesAntes, this.fechaActual);
    this.getUsersByGender(this.fechaTresMesesAntes, this.fechaActual);
    this.getStudentsByPrograms(this.fechaTresMesesAntes, this.fechaActual);
    this.getStudentsByPackages(this.fechaTresMesesAntes, this.fechaActual);
    this.getEarningsByPackages(this.fechaTresMesesAntes, this.fechaActual);
    this.getEarningsByPrograms(this.fechaTresMesesAntes, this.fechaActual);
    this.getUsersInfoDemographics(this.fechaTresMesesAntes, this.fechaActual);
    this.getSalesLineTime(this.fechaTresMesesAntes, this.fechaActual);
    this.onChangeStartDate()
  }

  _builderForm() {
    const form = this._formBuilder.group({
      startDate: ['', [Validators.required]],
      endDate: [{value: '', disabled: true}, [Validators.required]],
    });

    return form;
  }

  get startDate() { return this.searchForm.controls["startDate"] }
  get endDate() { return this.searchForm.controls["endDate"] }

  getQuantityStudent(startDate: any, endDate: any){
    this.dashboardService.getQuantityStudent(startDate, endDate).subscribe((res: any) => {
      // console.log('res: ', res)
      this.quantityStudents = res[0].students;
    })
  }

  
  getTotalEarningSales(startDate: any, endDate: any){
    this.dashboardService.getTotalEarningSales(startDate, endDate).subscribe((res: any) => {
      // console.log('res: ', res)
      this.totalSalesEarnings = res.total?.toFixed(2);
      // this.quantityStudents = res.students;
    })
  }

  getSalesByTypeVoucher(startDate: any, endDate: any){
    this.dashboardService.getSalesByTypeVoucher(startDate, endDate).subscribe((res: any) => {
      // console.log('res: ', res)
      this.totalSalesByType = res;
    })
  }

  
  getSalesByPaymentMethod(startDate: any, endDate: any){
    this.dashboardService.getSalesByPaymentMethod(startDate, endDate).subscribe((res: any) => {
      // console.log('res: ', res)
      this.totalSalesByPaymentMethod = res;

    })
  }

  getUsersByGender(startDate: any, endDate: any){
    this.dashboardService.getUsersByGender(startDate, endDate).subscribe((res:any) => {
      // console.log('res', res)
      this.userByGenderInfo = res;
    })
  }

  getSalesLineTime(startDate: any, endDate: any){
    this.dashboardService.getSalesLineTime(startDate, endDate).subscribe((res:any) => {
      // console.log('line time: ', res);

      let series: any[] = [];
      let categories:any [] = [];

      res.forEach((item:any) => {
        let totalSales = item.month_sales.map(((x:any) => x.sales))
        categories = item.month_sales.map(((x:any) => x.month))
        // totalSales.push(item.month_sales.sales)
        let itemSerie = {
          name: item.package_name,
          data: totalSales
        }
        series.push(itemSerie)
      })

      // console.log('series', series)

      
     

      this.buildDiagramSalesLineTime(series, categories);

    })
  }

  buildDiagramSalesLineTime(series: any, categories: any){
    
    // console.log({series, categories})
    this.chartOptionsSalesLineTime = {
      series: series,
        chart: {
        height: 350,
        type: 'line',
        // dropShadow: {
        //   enabled: true,
        //   color: '#000',
        //   top: 18,
        //   left: 7,
        //   blur: 10,
        //   opacity: 0.5
        // },
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#ee1e1e', '#1e31ee', '#1eee24', '#ac03f5'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Venta mensuales por Servicio',
        align: 'left'
      },
      // grid: {
      //   borderColor: '#e7e7e7',
      //   row: {
      //     colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      //     opacity: 0.5
      //   },
      // },
      // markers: {
      //   size: 1
      // },
      xaxis: {
        categories: categories,
        title: {
          text: 'Month'
        }
      },
      tooltip: {
        
        y: {
          formatter: function (value) {
            return Math.round(value).toString(); // Quitar decimales
          }
        }
      },
      yaxis: {
        title: {
          text: 'Temperature'
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    };
  }

  getStudentsByPrograms(startDate: any, endDate: any){
    this.dashboardService.getStudentsByPrograms(startDate, endDate).subscribe((res: any) => {
      // console.log('res: ', res)
      let series: any[]
      if(res.length > 0){
        let array: any[] = res.map((item:any) => {
          let arrayData = []
          arrayData.push(Number(item.quantity_student))
          return {
            name: item.program_name,
            data: Number(item.quantity_student)
          }
        });
  
        array.forEach(item => {
          this.quantityStudentsList.push(item.data)
          this.categories.push(item.name)
        })
  
  
        series = [
          {
            name: 'Cantidad de estudiantes',
            data: this.quantityStudentsList
          }
        ]
      }else {
        series = [];
        this.categories = [];
      }
      

      this.buildDiagramStudentByProgram(series, this.categories)
    })
  }

  buildDiagramStudentByProgram(series:any, categories:any){
    
    // console.log({series, categories})
    this.chartOptionsStudentByProgram = {
      series: series,
      chart: {
        type: 'bar',
        height: 350
      },
      xaxis: {
        categories: categories,
        title: {
          text: 'Programas'
        }
      },
      colors: ['#33FF57'],
      yaxis: {
        title: {
          text: 'Cantidad de Alumnos'
        }
      },
      dataLabels: {
        enabled: true // Opcional: Oculta las etiquetas de datos en las barras
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val:any) {
            return `${val} alumnos`;
          }
        }
      },
      title: {
        text: 'Alumnos por Programa', // Título del gráfico
        align: 'center', // Alineación del título (center, left, right)
        margin: 10,
        style: {
          fontSize: '15px',
          fontWeight: 'bold',
          color: '#263238'
        }
      }
    };
  }

  getStudentsByPackages(startDate: any, endDate: any){
    this.dashboardService.getStudentsByPackages(startDate, endDate).subscribe((res: any) => {
      // console.log('getStudentsByPackages: ', res)
      let series: any[]
      if(res.length>0){
        let array: any[] = res.map((item:any) => {
          let arrayData = []
          arrayData.push(Number(item.quantity_student))
          return {
            name: item.package_name,
            data: Number(item.quantity_student)
          }
        });
  
        array.forEach(item => {
          this.quantityStudentsList2.push(item.data)
          this.categories2.push(item.name)
        })
  
  
        series = [
          {
            name: 'Cantidad de estudiantes',
            data: this.quantityStudentsList2
          }
        ]
  
      }else {
        series = [];
        this.categories2 = [];
      }
      

      this.buildDiagramStudentByPackage(series, this.categories2)
    })
  }

  buildDiagramStudentByPackage(series:any, categories:any){
    this.chartOptionsStudentByPackage = {
      series: series,
      chart: {
        type: 'bar',
        height: 350
      },
      xaxis: {
        categories: categories,
        title: {
          text: 'Paquetes'
        }
      },
      yaxis: {
        title: {
          text: 'Cantidad de Alumnos'
        }
      },
      colors: ['#ea3030'],
      dataLabels: {
        enabled: true // Opcional: Oculta las etiquetas de datos en las barras
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val:any) {
            return `${val} alumnos`;
          }
        }
      },
      title: {
        text: 'Alumnos por Paquete', // Título del gráfico
        align: 'center', // Alineación del título (center, left, right)
        margin: 10,
        style: {
          fontSize: '15px',
          fontWeight: 'bold',
          color: '#263238'
        }
      }
    };
  }

  getEarningsByPackages(startDate: any, endDate: any){
    this.dashboardService.getEarningsByPackages(startDate, endDate).subscribe((res: any) => {
      // console.log('getEarningsByPackages: ', res)

      let series: any[];
      if(res.length > 0){
        let array: any[] = res.map((item:any) => {
        
          return {
            name: item.package_name,
            data: Number(item.earning)
          }
        });
  
        array.forEach(item => {
          this.earningPackagesList.push(item.data)
          this.categories3.push(item.name)
        })
  
  
        series = [
          {
            name: 'Ingresos',
            data: this.earningPackagesList
          }
        ]
      }else {
        series = [];
        this.categories3 = [];
      }
      

      this.buildDiagramEarningByPackage(series, this.categories3)
    })
  }

  buildDiagramEarningByPackage(series:any, categories:any){

    this.chartOptionsEarningByPackage = {
      series: series,
      chart: {
        type: 'bar',
        height: 350
      },
      xaxis: {
        categories: categories,
        title: {
          text: 'Paquetes'
        }
      },
      yaxis: {
        title: {
          text: 'Cantidad Ganada (en soles)'
        }
      },
      dataLabels: {
        enabled: true // Opcional: Oculta las etiquetas de datos en las barras
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val:any) {
            return `S/. ${val}`;
          }
        }
      },
      title: {
        text: 'Ingresos por Paquete', // Título del gráfico
        align: 'center', // Alineación del título (center, left, right)
        margin: 10,
        style: {
          fontSize: '15px',
          fontWeight: 'bold',
          color: '#263238'
        }
      }
    };
  }

  getEarningsByPrograms(startDate: any, endDate: any){
    this.dashboardService.getEarningsByPrograms(startDate, endDate).subscribe((res:any) => {
      // console.log('res: ', res)
      let series: any[];
      if(res.length > 0){
        let array: any[] = res.map((item:any) => {
        
          return {
            name: item.program_name,
            data: Number(item.earning)
          }
        });
  
        array.forEach(item => {
          this.earningProgramList.push(item.data)
          this.categories4.push(item.name)
        })
  
  
        series = [
          {
            name: 'Ingresos',
            data: this.earningProgramList
          }
        ]
      }else {
        series = [];
        this.categories4 = [];
      }
      

      this.buildDiagramEarningByProgram(series, this.categories4)
    })
  }

  buildDiagramEarningByProgram(series:any, categories:any){

    this.chartOptionsEarningByProgram = {
      series: series,
      chart: {
        type: 'bar',
        height: 350
      },
      colors: ['#c030ea'],
      xaxis: {
        categories: categories,
        title: {
          text: 'Paquetes'
        }
      },
      yaxis: {
        title: {
          text: 'Cantidad Ganada (en soles)'
        }
      },
      dataLabels: {
        enabled: true // Opcional: Oculta las etiquetas de datos en las barras
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val:any) {
            return `S/. ${val}`;
          }
        }
      },
      title: {
        text: 'Ingresos por Programa', 
        align: 'center', 
        margin: 10,
        style: {
          fontSize: '15px',
          fontWeight: 'bold',
          color: '#263238'
        }
      }
    };
  }

  getUsersInfoDemographics(startDate: any, endDate: any){
    this.dashboardService.getUsersInfoDemographics(startDate, endDate).subscribe((res:any)=> {
      // console.log('res demo: ', res);
      
      const resultDepartments = res["resultDepartments"];

      const resultDistricts = res["resultDistricts"];

      const resultProvinces = res["resultProvinces"]
      
      // console.log({resultDepartments, resultDistricts, resultProvinces })

      const deparmentList = resultDepartments.map((item:any) => item.department)
      const deparmentsNumber = resultDepartments.map((item:any) => Number(item.students))
      let series = [
        {
          name: 'Alumnos',
          data: deparmentsNumber
        }
      ]


      this.buildDiagramDemographicDepartment(series, deparmentList)

      

      const provinceList = resultProvinces.map((item:any) => item.province)
      const provincesNumber = resultProvinces.map((item:any) => Number(item.students))
      let series2 = [
        {
          name: 'Alumnos',
          data: provincesNumber
        }
      ]


      this.buildDiagramDemographicProvince(series2, provinceList)

      const districtList = resultDistricts.map((item:any) => item.district)
      const districtsNumber = resultDistricts.map((item:any) => Number(item.students))
      let series3 = [
        {
          name: 'Alumnos',
          data: districtsNumber
        }
      ]

      this.buildDiagramDemographicDistrict(series3, districtList)

    })
  }

  buildDiagramDemographicDepartment(series:any, categories:any){

    // console.log('series', series)
    // console.log('categories', categories)
    this.chartOptionsInfoDemographicsDepartment = {
      series: series,
      chart: {
        type: 'bar',
        height: 350
      },
      colors: ['#97a418'],
      xaxis: {
        categories: categories,
        title: {
          text: 'Paquetes'
        }
      },
      yaxis: {
        title: {
          text: 'Numero de Alumnos'
        }
      },
      dataLabels: {
        enabled: true // Opcional: Oculta las etiquetas de datos en las barras
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val:any) {
            return `${val}`;
          }
        }
      },
      title: {
        text: 'Estudiantes por Departamentos', 
        align: 'center', 
        margin: 10,
        style: {
          fontSize: '15px',
          fontWeight: 'bold',
          color: '#263238'
        }
      }
    };
  }

  buildDiagramDemographicProvince(series:any, categories:any){

    // console.log('series', series)
    // console.log('categories', categories)
    this.chartOptionsInfoDemographicsProvince = {
      series: series,
      chart: {
        type: 'bar',
        height: 350
      },
      colors: ['#32eae8'],
      xaxis: {
        categories: categories,
        title: {
          text: 'Paquetes'
        }
      },
      yaxis: {
        title: {
          text: 'Numero de Alumnos'
        }
      },
      dataLabels: {
        enabled: true // Opcional: Oculta las etiquetas de datos en las barras
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val:any) {
            return `${val}`;
          }
        }
      },
      title: {
        text: 'Estudiantes por Provincia', 
        align: 'center', 
        margin: 10,
        style: {
          fontSize: '15px',
          fontWeight: 'bold',
          color: '#263238'
        }
      }
    };
  }

  buildDiagramDemographicDistrict(series:any, categories:any){

    // console.log('series', series)
    // console.log('categories', categories)
    this.chartOptionsInfoDemographicsDistrict = {
      series: series,
      chart: {
        type: 'bar',
        height: 350
      },
      colors: ['#c030ea'],
      xaxis: {
        categories: categories,
        title: {
          text: 'Paquetes'
        }
      },
      yaxis: {
        title: {
          text: 'Numero de Alumnos'
        }
      },
      dataLabels: {
        enabled: true // Opcional: Oculta las etiquetas de datos en las barras
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val:any) {
            return `${val}`;
          }
        }
      },
      title: {
        text: 'Estudiantes por Distrito', 
        align: 'center', 
        margin: 10,
        style: {
          fontSize: '15px',
          fontWeight: 'bold',
          color: '#263238'
        }
      }
    };
  }

  // buildDiagramInfoDemographics(departmentList:any, categories:any){

  //   this.chartOptionsInfoDemographics = {
  //     series: [
  //       {
  //         name: "Provincia",
  //         data: [200, 300, 100, 10], // Cantidades de alumnos por Provincia
  //       },
  //       {
  //         name: "Distrito",
  //         data: [50, 80, 30,], // Cantidades de alumnos por Distrito
  //       },
  //     ],
  //     chart: {
  //       type: "bar",
  //       stacked: true,
  //       height: 350,
  //     },
  //     plotOptions: {
  //       bar: {
  //         horizontal: true,
  //       },
  //     },
  //     xaxis: {
  //       categories: departmentList,
  //     },
  //   };
    
  // }

  onChangeStartDate(){
    this.startDate.valueChanges.subscribe(res => {
      this.endDate.enable();
    })
  }

  onStartDateChange(event: Event){
    const input = event.target as HTMLInputElement;
    // console.log('input: ', input.value)
    
    this.endDate.enable();
    this.endDate.reset();
    this.minEndDate = input.value;
  }

  searchByDate(){

    const payloadSearch = {
      starDate: this.startDate.value,
      endDate: this.endDate.value
    }

    console.log(payloadSearch)
    // return;
    this.getQuantityStudent(payloadSearch.starDate,payloadSearch.endDate);
    this.getTotalEarningSales(payloadSearch.starDate,payloadSearch.endDate);
    this.getSalesByTypeVoucher(payloadSearch.starDate,payloadSearch.endDate);
    this.getSalesByPaymentMethod(payloadSearch.starDate,payloadSearch.endDate);
    this.getUsersByGender(payloadSearch.starDate,payloadSearch.endDate);
    this.getStudentsByPrograms(payloadSearch.starDate,payloadSearch.endDate);
    this.getStudentsByPackages(payloadSearch.starDate,payloadSearch.endDate);
    this.getEarningsByPackages(payloadSearch.starDate,payloadSearch.endDate);
    this.getEarningsByPrograms(payloadSearch.starDate,payloadSearch.endDate);
    this.getUsersInfoDemographics(payloadSearch.starDate,payloadSearch.endDate);
    this.getSalesLineTime(payloadSearch.starDate,payloadSearch.endDate);
  }





}
