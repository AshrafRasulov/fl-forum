package com.DL.junior.service.util;

import com.zaxxer.hikari.HikariDataSource;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class DB {

  public static void done (Connection conn, CallableStatement cs, HikariDataSource hds) {
    try {
      if (conn != null) conn.close();
      if (cs != null) cs.close();
      if (hds != null) hds.close();
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }

  public static void done (Connection conn, CallableStatement cs) {
    try {
      if (conn != null) conn.close();
      if (cs != null) cs.close();
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }

  public static void done (Connection conn, PreparedStatement ps) {
    try {
      if (conn != null) conn.close();
      if (ps != null) ps.close();
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }

  public static void done(HikariDataSource hds, Connection conn) {
    try {
      if (conn != null) {
        conn.close();
        hds.evictConnection(conn);
      }
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }

}
