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
    private dashboardService: DashboardService
  ) {  }

  ngOnInit(): void {
    this.getQuantityStudent();
    this.getTotalEarningSales();
    this.getSalesByTypeVoucher();
    this.getSalesByPaymentMethod();
    this.getUsersByGender();
    this.getStudentsByPrograms();
    this.getStudentsByPackages();
    this.getEarningsByPackages();
    this.getEarningsByPrograms();
    this.getUsersInfoDemographics();
    this.getSalesLineTime();
  }

  getQuantityStudent(){
    this.dashboardService.getQuantityStudent().subscribe((res: any) => {
      // console.log('res: ', res)
      this.quantityStudents = res.students;
    })
  }

  
  getTotalEarningSales(){
    this.dashboardService.getTotalEarningSales().subscribe((res: any) => {
      console.log('res: ', res)
      this.totalSalesEarnings = res.total.toFixed(2);
      // this.quantityStudents = res.students;
    })
  }

  getSalesByTypeVoucher(){
    this.dashboardService.getSalesByTypeVoucher().subscribe((res: any) => {
      console.log('res: ', res)
      this.totalSalesByType = res;
    })
  }

  
  getSalesByPaymentMethod(){
    this.dashboardService.getSalesByPaymentMethod().subscribe((res: any) => {
      console.log('res: ', res)
      this.totalSalesByPaymentMethod = res;

    })
  }

  getUsersByGender(){
    this.dashboardService.getUsersByGender().subscribe((res:any) => {
      // console.log('res', res)
      this.userByGenderInfo = res;
    })
  }

  getSalesLineTime(){
    this.dashboardService.getSalesLineTime().subscribe((res:any) => {
      console.log('line time: ', res);

      let series: any[] = [];

      res.forEach((item:any) => {
        let totalSales = item.month_sales.map(((x:any) => x.sales))
        // totalSales.push(item.month_sales.sales)
        let itemSerie = {
          name: item.package_name,
          data: totalSales
        }
        series.push(itemSerie)
      })

      console.log('series', series)
     

      this.buildDiagramSalesLineTime(series);

    })
  }

  buildDiagramSalesLineTime(series: any){
    
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
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
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

  getStudentsByPrograms(){
    this.dashboardService.getStudentsByPrograms().subscribe((res: any) => {
      // console.log('res: ', res)
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


      let series = [
        {
          name: 'Cantidad de estudiantes',
          data: this.quantityStudentsList
        }
      ]

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

  getStudentsByPackages(){
    this.dashboardService.getStudentsByPackages().subscribe((res: any) => {
      // console.log('res: ', res)
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


      let series = [
        {
          name: 'Cantidad de estudiantes',
          data: this.quantityStudentsList2
        }
      ]

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

  getEarningsByPackages(){
    this.dashboardService.getEarningsByPackages().subscribe((res: any) => {
      // console.log('res: ', res)
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


      let series = [
        {
          name: 'Ingresos',
          data: this.earningPackagesList
        }
      ]

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

  getEarningsByPrograms(){
    this.dashboardService.getEarningsByPrograms().subscribe((res:any) => {
      // console.log('res: ', res)
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


      let series = [
        {
          name: 'Ingresos',
          data: this.earningProgramList
        }
      ]

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

  getUsersInfoDemographics(){
    this.dashboardService.getUsersInfoDemographics().subscribe((res:any)=> {
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





}
