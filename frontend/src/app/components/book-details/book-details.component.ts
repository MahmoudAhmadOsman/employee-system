import { ActivatedRoute, Router } from '@angular/router';
import { Book } from './../../models/book';
 
import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  title: string ="Book Details";
  id: number;
  book: Book = new Book(); //hmm
   

  constructor(private bookService: BookService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.bookService.viewBookDetails(this.id).subscribe(data =>{
      console.log(data);
      this.book = data;
    },
    error => console.log( "Unable to view or get book by id ", error));

  }

  //GET - Get list of all books
  private getAllBooks() {
    this.bookService.getBooksList().subscribe((data) => {
         console.log(data);
         this.router.navigate(['/books']);
      
    });
  }



editBook(id: number){
  this.router.navigate(['edit-book', id]);
 
}
deleteBook(id: number){
this.bookService.deleteBook(id).subscribe(data =>{
  this.getAllBooks();
},error=> console.log("Error: while deleting an books",error))
}




////DELETE Employee
// deleteEmployee(id: number){
//    this.employeeService.deleteEmployee(id).subscribe(data =>{
//      this.getEmployees();
//    }, error=> console.log("Error: while deleting an employee",error));
// }


}

