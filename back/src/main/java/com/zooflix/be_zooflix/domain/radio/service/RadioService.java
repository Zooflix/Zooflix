package com.zooflix.be_zooflix.domain.radio.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.DataLine;
import javax.sound.sampled.SourceDataLine;
import javax.xml.transform.Result;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class RadioService {
    /* News.py 엔드포인트 */
    @Value("${python.endpoint.news.crawling}")
    private String pythonEndpointNewsCrawling;
    @Value("${python.endpoint.news.translation}")
    private String pythonEndpointNewsTranslation;
    @Value("${python.endpoint.news.summary}")
    private String pythonEndpointNewsSummary;
    @Value("${python.endpoint.news.tts}")
    private String pythonEndpointNewsTts;

    /* 웹크롤링하는 웹사이트 url */
    @Value("${python.news.url}")
    private String pythonNewsUrl;

    /* 번역 관련 변수 */
    @Value("${python.ppg.clientId}")
    private String pythonPpgClientId;
    @Value("${python.ppg.clientSecret}")
    private String pythonPpgClientSecret;
    @Value("${python.ppg.url}")
    private String pythonPpgUrl;

    /* 요약 관련 변수 */
    @Value("${python.summary.clientId}")
    private String pythonSummaryClientId;
    @Value("${python.summary.clientSecret}")
    private String pythonSummaryClientSecret;
    @Value("${python.summary.url}")
    private String pythonSummaryUrl;

    /* tts 관련 변수 */
    @Value("${python.tts.url}")
    private String pythonTtsUrl;
    @Value("${python.tts.clientId}")
    private String pythonTtsClientId;
    @Value("${python.tts.clientSecret}")
    private String pythonTtsClientSecret;


    /*
    * 웹크롤링
    * */
    public String callCrawlingEndpoint() {
        RestTemplate restTemplate = new RestTemplate();
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("webUrl", pythonNewsUrl); // 요청 바디에 크롤링사이트 url을 추가

        String result = restTemplate.postForObject(pythonEndpointNewsCrawling, requestBody, String.class);
        return result;
    }



    /*
    * 번역 by papago
    * */
    public String callTranslationEndpoint(String content) {
        RestTemplate restTemplate = new RestTemplate();
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("clientId", pythonPpgClientId);
        requestBody.put("clientSecret", pythonPpgClientSecret);
        requestBody.put("ppgUrl", pythonPpgUrl);
        requestBody.put("text", content);

        String result = restTemplate.postForObject(pythonEndpointNewsTranslation, requestBody, String.class);
        return result;
    }


    /*
     * 요약 by kobart
     * */
//    public String callSummaryEndpoint() {
//        String content = "시장 관계자들이 연방준비제도의 정책 방향에 대한 단서를 찾기 위해 세계 최대 경제국에서 더 많은 자료를 기다리면서 목요일 외환시장은 진정세를 보였습니다.화요일 예상보다 뜨거운 미국 소비자물가지수(CPI)는 인플레이션이 여전히 고착화될 수 있다는 우려에 다시 불을 붙였고, 트레이더들은 연준이 당초 예상대로 6월 회의에서 금리 인하를 시작할 것인지 재평가해야 한다.LSEG의 금리 확률 앱에 따르면 시장 참가자들은 6월 금리 인하 가능성을 여전히 65%로 보고 있다. 7월 금리 인하 가능성은 83% 수준이다.연준이 다음 주 회의에서 금리를 안정적으로 유지할 것이라는 전망이 우세한 가운데 은행의 최신 경제 전망에 관심이 쏠릴 것으로 보입니다.Capital.com 의 수석 금융 시장 분석가인 카일 로다는 \\\\\\\"데이터는 금리 기대치의 한계적인 변화를 몰고 있지만 궁극적으로 시장은 최근 올해 세 차례의 인하로 상당히 안정세를 보이고 있다\\\\\\\"고 말했다.그는 \\\\\\\"다음  주에 더 매파적인 연준이 이를 두 차례 (금리 인하)로 낮추고 1~9월에 대한 기대를 늦출 수 있다\\\\\\\"며 이는 본질적으로 미국 달러에 대한 강세장이 될 것이라고 말했다.6개 통화 바스켓에 대한 달러화 가치를 나타내는 달러인덱스는 102.77로 대부분 보합세를 보였다.시장은 미국의 소매판매 데이터, 생산자물가지수, 즉 PPI, 보고서 및 실업수당 청구를 면밀히 조사하여 경제가 둔화되고 있다는 더 많은 증거를 찾을 것이다.제롬 파월 연준 의장은 지난 주 미국 중앙은행이 완화를 시작하는 데 필요한 자신감을 얻는 것이 \\\"멀지 않다\\\"고 말했다.엔화에 대해 달러는 3월 18~19일 일본은행 통화정책회의에서 마이너스 금리에서 빠져나가는 모습이 계속되면서 147.69엔에 머물고 있다.소식통들은 로이터통신에 대기업들의 임금협상이 강력한 성과를 낼 경우 일본 중앙은행이 다음 주 마이너스 금리를 끝내는 방안을 논의할 것이라고 전했다.봄 임금 협상의 잠정 결과는 금요일까지이며, 이미 몇몇 국내 최대 기업들이 임금 인상에 대한 노조의 요구를 완전히 충족시키기로 합의했다는 소식이 흘러나오기 시작했다.다른 곳에서는 유로화가 목요일 몇몇 유럽중앙은행 관계자들의 발언을 앞두고 달러 대비 1.0949달러로 안정세를 유지하고 있었다.스털링은 1.2796달러로 보합세를 보였다. 영국 경제가 2023년 하반기 얕은 경기침체에 진입한 후 1월에 성장세로 돌아섰다는 데이터가 수요일에 나왔다.암호화폐에서 비트코인은 전장 7만3678달러로 사상 최고가를 기록한 뒤 0.28% 하락한 7만2950.00달러를 마지막으로 거래를 마쳤다.에테르는 0.03% 하락한 3,991.00달러를 기록했다. 러시아 정유공장에 대한 우크라이나의 공격에 따른 공급 차질 가능 성도 가격을 뒷받침하는 가운데, 미국의 원유 비축량이 깜짝 감소하면서 수요가 증가한 것으로 나타나면서 목요일 유가는 아시아 교역에서 상승폭을 확대했다.브렌트유 선물은 GMT 기준 10센트(0.12%) 오른 배럴당 84.13달러, 미국 서부텍사스산 원유(WTI)는 7센트(0.9%) 오른 배럴당 79.79달러에 거래됐다.두 계약 모두 미국의 수요 전망이 높아지고 지정학적 위험이 고조되면서 수요일 약 3% 상승해 4개월 만에 최고치를 기록했다.수요일 러시아 정제 시설에 대한 우크라이나 드론 공격이 이틀째 계속되어 최근 몇 달 동안 러시아 에너지 부문에 대한 가장 심각한 공격 중 하나로 로스네프트의 가장 큰 정유 공장에서 화재가 발생했다.우크라이나는 20일 니즈니노브고로드에 있는 루코일 정유공장에 심각한 피해를 입힌 뒤 로스토프와 랴잔 지역의 정유공장에 타격을 입혔 다고 러시아 관리들이 밝혔다.랴잔에서는 드론 공격으로 로스네프트의 정유공장에서 화재가 발생했다. 상황에 정통한 두 소식통은 로이터통신에 정유공장이 2개의 1차 정유공장을 폐쇄할 수밖에 없었다고 전했다.블라디미르 푸틴 러시아 대통령은 18일(현지시간) 서방 국가들과 가진 국영 언론과의 인터뷰에서 러시아는 기술적으로 핵전쟁에 대비할 준비가 돼 있다고 밝혔다.미국 에너지 정보청(EIA)은 여름 휴가철을 앞두고 수요가 호조를 보이는 가운데 가공량이 늘고 휘발유 재고가 줄면서 수요 측면에서 미국의 원유 비축량이 예상외로 감소했다고 19일 밝혔다.EIA는 3월 8일로 끝난 주에 원유 재고가 6주 연속 150만 배럴 감소한 4억4700만 배럴을 기록했다고 밝혔다.휘발유 재고는 6주 연속 감소해 570만 배럴 감소한 2억3410만 배럴을 기록했다고 EIA는 밝혔다.미국 걸프만의 자동차 연료 재고는 2022년 11월 이후 최저치로 떨어졌고, 수요 대용품인 완성차 휘발유는 하루 3만 배럴 증가해 올해 처음으로 900만 배럴 이상을 기록했다.";
////        System.out.println("summary parameter: "+content);
//        RestTemplate restTemplate = new RestTemplate();
//        Map<String, String> requestBody = new HashMap<>();
//        requestBody.put("text", content);
//
//        String result = restTemplate.postForObject(pythonEndpointNewsSummary, requestBody, String.class);
//        return result;
//    }


    /*
     * 요약 by clova
     * */
    public String callSummaryEndpoint(String content) {
        RestTemplate restTemplate = new RestTemplate();
        Map<String, String> requestBody;

        // 2000자 넘을 경우 나눠서 요약하기
        String summary = "";
        if (content.length()<2000) {
            requestBody = new HashMap<>();
            requestBody.put("clientId", pythonSummaryClientId);
            requestBody.put("clientSecret", pythonSummaryClientSecret);
            requestBody.put("clovaUrl", pythonSummaryUrl);
            requestBody.put("text", content);
            summary = restTemplate.postForObject(pythonEndpointNewsSummary, requestBody, String.class);

            return summary;
        } else {
            String delim = "다.";
            String[] arr = content.split(delim);
            int totalSize = 0;
            String request = "";
            String result = "";
            for (int i = 0; i < arr.length; i++) {
                totalSize += arr[i].length();
                request += (arr[i] + "다.");
                if (i + 1 == arr.length)
                    continue;
                if (totalSize + arr[i + 1].length() > 2000) {
                    requestBody = new HashMap<>();
                    requestBody.put("clientId", pythonSummaryClientId);
                    requestBody.put("clientSecret", pythonSummaryClientSecret);
                    requestBody.put("clovaUrl", pythonSummaryUrl);
                    requestBody.put("text", request);
                    totalSize = 0;
                    request = "";
                    summary = restTemplate.postForObject(pythonEndpointNewsSummary, requestBody,
                            String.class);
                }
                result += summary;
            }

            return result;
        }

    }


//    /*
//     * tts by pysttx
//     * */
//    public String callTtsEndpoint(String content) {
//        RestTemplate restTemplate = new RestTemplate();
//        Map<String, String> requestBody = new HashMap<>();
//        String result = restTemplate.postForObject(pythonEndpointNewsTts, requestBody, String.class);
//        System.out.println("tts success");
//        return result;
//    }


    /*
    * tts by clova
    * */
    public byte[] callTtsEndpoint() {
//        String content = "미국일 원유 비축량의 깜짝 감소로 수요가 증가한 후 아시아 무역의 상승폭이 확대되었고, 우크라이나의 러시아 정유소 공격에 따른 공급 차질 가능성도 가격을 뒷받침했고, 브렌트유 선물은 GMT 기준 10센트(0.12%) 오른 배럴당 84.13달러, 미국 서부텍사스산 원유(WTI)는 7센트(0.9%) 오른 배럴당 79.79달러로 두 계약 모두 미국의 수요 전망이 높아지고 지정학적 위험이 고조되면서 수요일 약 3% 상승해 4개월 만에 최고치를 기록했다.";
//        RestTemplate restTemplate = new RestTemplate();
//        Map<String, String> requestBody = new HashMap<>();
//        requestBody.put("clientId", pythonTtsClientId);
//        requestBody.put("clientSecret", pythonTtsClientSecret);
//        requestBody.put("ttsUrl", pythonTtsUrl);
//        requestBody.put("text", content);
//
//        String result = restTemplate.postForObject(pythonEndpointNewsTts, requestBody, String.class);
//        return result;
        try {
            String text = URLEncoder.encode("미국일 원유 비축량의 깜짝 감소로 수요가 증가한 후 아시아 무역의 상승폭이 확대되었고, 우크라이나의 러시아 정유소 공격에 따른 공급 차질 가능성도 가격을 뒷받침했고, 브렌트유 선물은 GMT 기준 10센트(0.12%) 오른 배럴당 84.13달러, 미국 서부텍사스산 원유(WTI)는 7센트(0.9%) 오른 배럴당 79.79달러로 두 계약 모두 미국의 수요 전망이 높아지고 지정학적 위험이 고조되면서 수요일 약 3% 상승해 4개월 만에 최고치를 기록했다.", "UTF-8");
            URL url = new URL(pythonTtsUrl);
            HttpURLConnection con = (HttpURLConnection)url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("X-NCP-APIGW-API-KEY-ID", pythonTtsClientId);
            con.setRequestProperty("X-NCP-APIGW-API-KEY", pythonTtsClientSecret);

            // post request
            String postParams = "speaker=nara&volume=5&speed=0&pitch=0&text=" + text;
            con.setDoOutput(true);
            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            wr.writeBytes(postParams);
            wr.flush();
            wr.close();
            int responseCode = con.getResponseCode();
            BufferedReader br;
            if(responseCode==200) { // 정상 호출
                InputStream is = con.getInputStream();
                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                byte[] buffer = new byte[1024];
                int bytesRead;
                while ((bytesRead = is.read(buffer)) != -1) {
                    baos.write(buffer, 0, bytesRead);
                }
                baos.close();
                is.close();
                return baos.toByteArray();

            } else { // 오류 발생
                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
                String inputLine;
                StringBuffer response = new StringBuffer();
                while ((inputLine = br.readLine()) != null) {
                    response.append(inputLine);
                }
                br.close();
                System.out.println(response.toString());
                return null;
            }
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }


    /*
    * 라디오봇
    * */
    public String getRadio() throws JsonProcessingException {
        String crawling = callCrawlingEndpoint();
        System.out.println(crawling);
        System.out.println("crawling success");
//        String translation = "목요일 미국 원유 비축량의 깜짝 감소로 수요가 증가한 후 아시아 무역의 상승폭이 확대되었고, 우크라이나의 러시아 정유소 공격에 따른 공급 차질 가능성도 가격을 뒷받침했다. 브렌트유 선물은 GMT 기준 10센트(0.12%) 오른 배럴당 84.13달러, 미국 서부텍사스산 원유(WTI)는 7센트(0.9%) 오른 배럴당 79.79달러에 거래됐다. 두 계약 모두 미국의 수요 전망이 높아지고 지정학적 위험이 고조되면서 수요일 약 3% 상승해 4개월 만에 최고치를 기록했다. 수요일 러시아 정제 시설에 대한 우크라이나 드론 공격이 이틀째 계속되어 최근 몇 달 동안 러시아 에너지 부문에 대한 가장 심각한 공격 중 하나로 로스네프트의 가장 큰 정유 공장에서 화재가 발생했다. 우크라이나는 20일 니즈니노브고로드에 있는 루코일 정유공장에 심각한 피해를 입힌 뒤 로스토프와 랴잔 지역의 정유공장에 타격을 입혔다고 러시아 관리들이 밝혔다. 랴잔에서는 드론 공격으로 로스네프트의 정유공장에서 화재가 발생했다. 상황에 정통한 두 소식통은 로이터통신에 정유공장이 2개의 1차 정유공장을 폐쇄할 수밖에 없었다고 전했다. 블라디미르 푸틴 러시아 대통령은 18일(현지시간) 서방 국가들과 가진 국영 언론과의 인터뷰에서 러시아는 기술적으로 핵전쟁에 대비할 준비가 돼 있다고 밝혔다. 미국 에너지정보청(EIA)은 여름 휴가철을 앞두고 수요가 호조를 보이는 가운데 가공량이 늘고 휘발유 재고가 줄면서 수요 측면에서 미국의 원유 비축량이 예상외로 감소했다고 19일 밝혔다. EIA는 3월 8일로 끝난 주에 원유 재고가 6주 연속 150만 배럴 감소한 4억4700만 배럴을 기록했다고 밝혔다. 휘발유 재고는 6주 연속 감소해 570만 배럴 감소한 2억3410만 배럴을 기록했다고 EIA는 밝혔다. 미국 걸프만의 자동차 연료 재고는 2022년 11월 이후 최저치로 떨어졌고, 수요 대용품인 완성차 휘발유는 하루 3만 배럴 증가해 올해 처음으로 900만 배럴 이상을 기록했다";
        String refine = crawling.replace("\",\"", "@@@@@");
        List<String> summaryList = new ArrayList<>();
        String[] arr = refine.split("@@@@@");
        for(String str : arr ) {

            String translation = callTranslationEndpoint(str);
            System.out.println(translation);
            System.out.println("translation success");
            String summary = callSummaryEndpoint(translation).replace("\\n", " ");
            String result = summary.replace("\\", " ");
            System.out.println("summary success");

            summaryList.add(result.replace("\\n", " "));
        }
        System.out.println("summaryList: "+summaryList);
//        for(String str : summaryList) {
//            String result = callTtsEndpoint(str);
//            System.out.println(result);
//        }
        return "success";
    }




    //    /*
//    * 키워드 추출
//    * */
//    public String getKeyword() {
//        String crawling = callCrawlingEndpoint();
//        System.out.println(crawling);
//        System.out.println("crawling success");
//        String refine = crawling.replace("\",\"", "@@@@@");
//        List<String> keywordList = new ArrayList<>();
//        String[] arr = refine.split("@@@@@");
//        String result = "";
//        for(String str : arr ) {
//            System.out.println(str);
//            RestTemplate restTemplate = new RestTemplate();
//            Map<String, String> requestBody = new HashMap<>();
//            requestBody.put("content", str);
//
//            String keyword = restTemplate.postForObject("http://127.0.0.1:8000/radio/keyword", requestBody, String.class);
//            keywordList.add(keyword.replace("\\n", " "));
//
//        }
//        System.out.println("keywordList: "+keywordList);
////        for(String str : summaryList) {
////            String result = callTtsEndpoint(str);
////            System.out.println(result);
////        }
//        return "success";
//    }
}
