package com.wfl.test.user;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequestMapping
public class UserController {
	
//	@Autowired
//	UserService us;
	
//	@PostMapping("/signup")
//	public String signup(@Valid UserDTO userDTO, BindingResult bindingResult) {

//	@GetMapping("/insert")
//	public void insert(@RequestParam Integer id, @RequestParam String title) {
//		System.out.println(id);
//		System.out.println(title);
//	}
//	
//	@GetMapping("/board")
//	public String board() {
//		System.out.println("연결 잘됨?");
//		return "연결테스트";
//	}
	
//	@GetMapping("/{userName}")
//	public void Userget(@PathVariable String name) {
//		System.out.println("이름받았나?");
//		System.out.println(name);
//	}
	
	@CrossOrigin(origins = "http://localhost:5173")
	@RestController
	public class DataController {

	    @GetMapping("/data-test")
	    public String springDataTest(){
	        return "스프링에서 보내는 데이터2";
	    }
	}
}	
