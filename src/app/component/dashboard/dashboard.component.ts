import { Component, OnInit} from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj:Task=new Task();
  taskArr:Task[]=[];
  addTaskValue:string='';
  editTaskValue:string='';
  // isThereTask:Boolean=false
  // dnTask:string=''
  constructor(private crudService:CrudService) { }

  ngOnInit(): void {
    this.addTaskValue=''
    this.editTaskValue=''
    this.taskObj=new Task();
    this.taskArr=[]
    this.getAllTasks()
    if(this.taskArr.length==0){
      // this.isThereTask=true
    }
  }

  getAllTasks(){
    this.crudService.getAllTask().subscribe((response=>{
      this.taskArr=response;
    })
        //,(err:Error)=>{alert(err.message)}
    )
  }
  addTask(){
    if(this.addTaskValue==''){
      alert('you should enter a task')
    }
    else{
    this.taskObj.task_name=this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe(data=>{
        this.ngOnInit()
        this.addTaskValue=''
        // console.log('add')
        // this.isThereTask=false
    }

    //,(err:Error)=>{alert(err.message)}
)}
  }
  editTask(){
    if(this.editTaskValue==''){
      alert('update value should not be empty')
    }
    else{
    this.taskObj.task_name=this.editTaskValue
    this.crudService.editTask(this.taskObj).subscribe((data)=>{
      this.ngOnInit();
    }
    //,(err:Error)=>{alert(err.message)}
)
  }
  }

  deletTask(eTask:Task){
    try{
      if(confirm('Do you wanna delet it?')){this.crudService.deletTask(eTask).subscribe((data)=>{
        this.ngOnInit();
      }
        )}


    }
    catch{
      alert('faild to delet Task')
    }
    // if(this.taskArr.length==0){
    //   // this.isThereTask=true
    // }

  }


  call(eTask:Task){
    this.taskObj=eTask;
    this.editTaskValue=eTask.task_name;
  }

  // doneTask(taskName:Task){
  //   this.dnTask=taskName.task_name+" (Done)"
  //   // this.doneBtn.nativeElement.value=taskName.task_name + "(Done)"
  //   console.log('dn')
  // }

}
