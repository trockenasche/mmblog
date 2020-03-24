---
title: AWS CDK Tutorial mit Travis Deployment
description: AWS CDK example mit Travis Deployment
show: 'no'
date: '2020-03-28'
image: 'docker.jpg'
tags: ['de', '2020', 'aws', 'lambda', 'cdk', 'cfd']
engUrl: http://martinmueller.dev/cdk-example-eng
pruneLength: 50
---

Ahoi AWS'ler

Für ein privates Projekt habe ich mich in den letzten Tagen an ein AWS CDK Example rangetraut. AWS bietet eine Palette von tollen Beispielprojekten hier: [AWS CDK Examples](https://github.com/aws-samples/aws-cdk-examples) . Die Erfahrung war so gut, dass ich mich entschlossen habe, einen Blogpost zu darüber zu schreiben. Schon sehr früh in meiner AWS Karriere durfe ich mich mit CloudFormation beschäftigen. Es hat mir damals schon viel Spaß gemacht, allerdigns seit neuem scheint ja ein neues Kind im Block zu sein mit namen AWS CDK (Cloud Development Kit). Dieses Kit verspricht ein leichteres Handling der Cloudformation Templates, da man anstelle wie üblich diese im eher komplexen YAML schreiben muss, werden im CDK richtige Programmiersprachen wie Java, Python, JS oder Typescript unterstützt. Ich finde das ein super Idee da man, wenn man sich für z.B. Typescript als Sprache für die Lambdas entschieden hat, auch diese für das CDK verwenden kann.
Mein Beispiel Code ist natürlich hier [CDK Example Repo](https://github.com/mmuller88/cdk-example) einsehbar. In den nächsten Abschnitten werde ich kurz die einzelnen Schritte für die Repo Erstellung beschreiben.

# Das wird Benötigt
Klar wenn du AWS CDK ausprobieren möchtest, benötigst du einen AWS Account. Darüber hinaus brauchst du AWS CLI Credentials, welche es deiner Programmierumgebung erlauben Resourcen in deinem AWS Account zu nutzen. Üblicherweise erstellt man dafür einen [IAM User](https://docs.aws.amazon.com/de_de/IAM/latest/UserGuide/id_users_create.html#id_users_create_cliwpsapi).
Das verwendete AWS Beispiel verwendet NPM als Package Manager. Das bedeutet es kümmert sich um die Dependencies wie zum Beispiel dem aws-cdk welches mit dem folgenden command installiert wird:

```
npm install -g aws-cdk
```
NPM is [hier](https://nodejs.org/en/download/) erhältlich.

# Git Repo Vorbereiten
So nun geht es los. Zuerst erstellen wir unser GitHub Repository welches noch komplett leer ist. Bei mir habe ich es **cdk-example** genannt. Dann sollte das [AWS CDK Examples](https://github.com/aws-samples/aws-cdk-examples) Repo geforkt und local ausgecheckt sein. Mit dem Hintergrund, dass wir so einfacher Cherry Picking betreiben können und somit einfach die für uns interesannten Beispiele darin in unser Repository kopieren können.

Wenn man sich das AWS CDK Examples Repository anschaut hat man nun sprichwörtlich die Qual der Wahl. Ich selber für die Beispiele von der Typescript Kategorie empfehlen da sie reichlich sind und Typescript anscheinend immer beliebter wird als Programmiersprache. Auch empfehle ich mit dem [Api Cors Lambda Crud DynamoDB](https://github.com/aws-samples/aws-cdk-examples/tree/master/typescript/api-cors-lambda-crud-dynamodb) Example anzufangen, da es schon sehr viele AWS Services beinhaltet wie API Gateway, Lambda und DynamoDB. Das Beispiel is ein einfacher CRUD Storage welches mit DynamoDB als DB fungiert. Am besten den bestehenden Quellcode nicht abändern und erstmal versuchen ihn nur zum Laufen zu bekommen. Ich selber hatte eine kleine Schwierigkeit. Das Beispiel hat eine missing Dependency. Undzware fehlt die uuid Library. Dafür muss ins src/ Verzeichnis gewechselt werden und die folgenden Command ausgeführt werden:

```
npm init
npm install uuid
```

Auch muss der Code etwas angepasst werden, da sich die uuid mit den Versionen etwas geändert hat. Alternativ kann auch einfach aus meinem [publizierten GitHub Repo](https://github.com/mmuller88/cdk-example) kopiert werden. Im nächsten Abschnitt bringen wir dann das Beispiel zum laufen.

# CDK Manuell Deployen
* Alle Schritte zum deployen in der Readme.
...

# Automation mmit Travis
* Will nicht wie vorher beschrieben immer manuell deployen müssen. Deshalb Travis nutzen
* .travis file erstellen. In meinen Repo sehen
* AWS environment variablen ermitteln
* AWS_ACCESS_KEY_ID, AWS_ACCOUNT_NUMBER, AWS_DEFAULT_REGION, AWS_SECRET_ACCESS_KEY, CDK_DEFAULT_ACCOUNT, CDK_DEFAULT_REGION
* Nächster Abschnitt wie automatisch testen.

# Stack Testing mit Postman
* Auch das Testen kann von Travis übernommen werden
* Postman eignet sich hervorragend zum erstellen von API Requests zu dem API Gateway. Sammlung von Requests wird Collection genannt.
* Würde den Umfang der Collection erstmal gering halten und nur das nötigste testen.
* Postman kann auch Responses evaluieren und z.B. Statuserwartungen testen. create Item Post sollte 201 returnen
* Postman hat eine CLI mit namen Newman welcher im Build installiert werden muss

# Zusammenfassung
* AWS noch recht neues CDK ist ein tolles Werkzeug zum erstellen von AWS Cloudformation Stacks. Sehr toll finde ich, dass man es in der gleichen Programmiersprache schreiben kann in der auch eventuell verwendete Lambdas sind. Kombiniert mit automatischen Deployment und Tests zum Beispiel mit Travis, erlaubt es schnell und effizient neue Änderungen am Stack durchzuführen. Ich glaube auch, dass es dadurch nicht oder weniger nötig ist Lambdas lokal testen zu müssen.

An die tollen Leser dieses Artikels sei gesagt, dass Feedback jeglicher Art gerne gesehen ist. In Zukunft werde ich versuchen hier eine Diskussionsfunktion einzubauen. Bis dahin sendet mir doch bitte direkten Feedback über meine Sozial Media accounts wie [Twitter](https://twitter.com/MartinMueller_) oder [FaceBook](https://www.facebook.com/martin.muller.10485). Vielen Dank :).

Ich liebe es an Content Management Open Source Projekte zu arbeiten. Vieles kannst du bereits frei nutzen auf www.github.com/mmuller88 . Wenn du meine dortige Arbeit sowie meine Blog Posts toll findest, denke doch bitte darüber nach, mich zu unterstützen und ein Patreon zu werden:

<a href="https://www.patreon.com/bePatron?u=29010217" data-patreon-widget-type="become-patron-button">Werde ein Patreon!</a><script async src="https://c6.patreon.com/becomePatronButton.bundle.js"></script>