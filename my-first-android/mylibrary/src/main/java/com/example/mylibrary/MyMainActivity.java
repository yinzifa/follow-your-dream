package com.example.mylibrary;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.util.Log;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.ImageButton;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

public class MyMainActivity extends Activity {
    private FrameLayout fl_container;
    private ImageButton btn_close;

    public static void init(Activity activity) {
        Intent intent = new Intent(activity,MyMainActivity.class);
        activity.startActivity(intent);
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.v("Mine", "onCreate: ==========");
        setContentView(R.layout.main_activity);
        fl_container = findViewById(R.id.fl_container);
        btn_close = findViewById(R.id.btn_close);
        btn_close.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                MyMainActivity.this.finish();
            }
        });

    }

    @Override
    protected void onStart() {
        super.onStart();
        Log.v("Mine", "onStart: ==========");
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.v("Mine", "onResume: ==========");
        WebView webview = new WebView(this);
        webview.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return false;
            }
        });
        webview.loadUrl("https://www.baidu.com/");
        fl_container.addView(webview);
    }
}