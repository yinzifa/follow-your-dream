package com.example.first_android;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.example.mylibrary.MyMainActivity;

public class MainActivity extends AppCompatActivity {
    private EditText etAppkey, etTenantid, etRoleid, etServiceKey, etServiceSecret;
    private Button btnInit, btnRegister, btnHorizontal, btnUnregister, btnOpen;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Log.v("11111","onCreate");
        initView();
    }

    @Override
    protected void onStart() {
        super.onStart();
        Log.v("11111","onStart");
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.v("11111","onResume");

    }

    private void initView() {
        //初始化输入框
        etAppkey = findViewById(R.id.et_appkey);
        etTenantid = findViewById(R.id.et_tenantid);
        etRoleid = findViewById(R.id.et_roleid);
        etServiceKey = findViewById(R.id.et_service_key);
        etServiceSecret = findViewById(R.id.et_service_secret);
        //初始化按钮
        btnInit = findViewById(R.id.btn_init);
        btnRegister = findViewById(R.id.btn_register);
        btnHorizontal = findViewById(R.id.btn_horizontal);
        btnUnregister = findViewById(R.id.btn_unregister);
        btnOpen = findViewById(R.id.btn_open);
        //点击-‘初始化配置’
        btnInit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                etAppkey.setError(null);
                etTenantid.setError(null);
                etRoleid.setError(null);
                etServiceKey.setError(null);
                etServiceSecret.setError(null);
                String appKey = etAppkey.getText().toString().trim();
                String tenantId = etTenantid.getText().toString().trim();
                String roleId = etRoleid.getText().toString().trim();
                String serviceKey = etServiceKey.getText().toString().trim();
                String serviceSecret = etServiceSecret.getText().toString().trim();
                if(TextUtils.isEmpty(appKey)) {
                    etAppkey.setError("请先输入appKey");
                    etAppkey.requestFocus();
                    return;
                }
                if(TextUtils.isEmpty(tenantId)) {
                    etTenantid.setError("请先输入tenantId");
                    etTenantid.requestFocus();
                    return;
                }
                if(TextUtils.isEmpty(roleId)) {
                    etTenantid.setError("请先输入roleId");
                    etTenantid.requestFocus();
                    return;
                }
                if(TextUtils.isEmpty(serviceKey)) {
                    etServiceKey.setError("请先输入serviceKey");
                    etServiceKey.requestFocus();
                    return;
                }
                if(TextUtils.isEmpty(serviceSecret)) {
                    etServiceSecret.setError("请先输入serviceSecret");
                    etServiceSecret.requestFocus();
                    return;
                }
            }
        });
        //点击-‘注册客服功能’
        btnRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                btnOpen.setVisibility(View.VISIBLE);
            }
        });
        //点击-‘更改游戏屏幕方向’
        btnHorizontal.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
//                btnOpen.setVisibility(View.VISIBLE);
            }
        });
        //点击-‘解除客服注册’
        btnUnregister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

            }
        });
        //点击-‘打开客服’
        btnOpen.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, MyMainActivity.class);
//                GameAssistant.start(MainActivity.this);
                MyMainActivity.init(MainActivity.this);
            }
        });
    }

    @Override
    protected void onPause() {
        super.onPause();
        Log.v("11111","onPause");
    }

    @Override
    protected void onStop() {
        super.onStop();
        Log.v("11111","onStop");
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.v("11111","onDestroy");
    }
}