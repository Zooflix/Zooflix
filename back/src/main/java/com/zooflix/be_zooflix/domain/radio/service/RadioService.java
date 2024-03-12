package com.zooflix.be_zooflix.domain.radio.service;

import org.python.core.PyObject;
import org.python.util.PythonInterpreter;
import org.springframework.stereotype.Service;

@Service
public class RadioService {
    private static PythonInterpreter interpreter;

    public String runPythonScript() {
        System.setProperty("python.import.fastapi", "false");
        interpreter = new PythonInterpreter();

        // Python 스크립트 경로 설정
        String pythonScriptPath = "C:\\venvs\\zooflix\\News.py";
        System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

        // Python 스크립트를 실행하고 반환값을 받아옴
        interpreter.execfile(pythonScriptPath);
        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        PyObject result = interpreter.get("summaryList"); // Python 스크립트에서 반환한 변수명에 따라 변경
        System.out.println(result.toString());
        return result.toString();
    }
}
