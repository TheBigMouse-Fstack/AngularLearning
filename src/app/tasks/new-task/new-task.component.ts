import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type NewTaskData } from '../task/task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true, // Standalone component: không cần module, có thể import trực tiếp ở component khác
  imports: [FormsModule], // Cho phép dùng ngModel, form features
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @Input({ required: true }) userId!: string; // Nhận userId từ component cha (bắt buộc phải truyền)
  @Output() close = new EventEmitter<void>(); // Tạo event để báo cho cha khi đóng form (cancel/submit)
  enteredTitle = ''; // Biến lưu giá trị nhập cho title (dùng ngModel)
  enteredSummary = ''; // Biến lưu giá trị nhập cho summary
  enteredDate = ''; // Biến lưu giá trị nhập cho date

  private tasksService = inject(TasksService); // Inject service để thao tác dữ liệu task

  // Khi bấm nút hủy
  onCancel() {
    this.close.emit(); // Emit event để báo cha đóng form
  }

  // Khi submit form (bấm nút Add hoặc Enter)
  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle, // Lấy dữ liệu nhập ở form
        summary: this.enteredSummary,
        date: this.enteredDate,
      },
      this.userId // Truyền thêm userId vào service
    );
    this.close.emit(); // Sau khi thêm task, emit event để đóng form add task
  }
}
