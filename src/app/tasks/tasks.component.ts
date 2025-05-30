import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { type NewTaskData } from './task/task.model';
import { NewTaskComponent } from './new-task/new-task.component';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true, // Component này là standalone (không cần module)
  imports: [TaskComponent, NewTaskComponent], // Import các component con cần thiết
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  @Input({ required: true }) userId!: string; // Nhận userId từ cha (biết hiển thị task của user nào)
  @Input({ required: true }) name!: string; // Nhận tên user từ cha để hiển thị

  isAddingTask = false; // Quản lý trạng thái có đang hiện form thêm task không

  private tasksService = inject(TasksService); // Inject service quản lý danh sách task

  // Getter: Lấy danh sách task của user hiện tại
  get selectedUserTasks() {
    return this.tasksService.getUserTasks(this.userId);
  }

  // Xử lý khi task được đánh dấu hoàn thành (cần implement)
  onCompleteTask(id: string) {
    this.tasksService.removeTask(id);
  }

  // Khi bắt đầu thêm task mới, bật trạng thái hiển thị form
  OnStartAddTask() {
    this.isAddingTask = true;
  }

  // Khi đóng form thêm task (sau khi submit hoặc hủy), tắt trạng thái hiển thị form
  OnCloseAddTask() {
    this.isAddingTask = false;
  }
}
