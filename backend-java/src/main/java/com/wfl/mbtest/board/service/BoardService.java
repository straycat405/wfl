
package com.wfl.mbtest.board.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

import com.wfl.mbtest.board.dto.Board;

public interface BoardService {
   
   public List<Board> list() throws Exception;
   
   public Board select(int no) throws Exception;
   
   public int insert(Board board) throws Exception;
   
   public int update(Board board) throws Exception;
   
   public int delete(int no) throws Exception;
   
   public int updateViews(@Param("count") int count, @Param("no") int no) throws Exception;


}