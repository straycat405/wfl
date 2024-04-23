
package com.wfl.mbtest.board.dto;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.type.Alias;
import org.springframework.stereotype.Repository;

@Alias("Board")
@Mapper
@Repository
public interface BoardMapper {
   
   //게시글 목록
   public List<Board> list() throws Exception;
   
   //게시글 조회
   public Board select(int no) throws Exception;
   
   //게시글 등록
   public int insert(Board board) throws Exception;
   
   //게시글 수정
   public int update(Board board) throws Exception;
   
   //게시글 삭제
   public int delete(int no) throws Exception;
   
   //게시글 업데이트
   public int updateViews(int count, int no) throws Exception;

}