rem @Echo off
del /q deploy.log
call ..\node_modules\.bin\ng build --configuration=preprod
echo %ERRORLEVEL%
IF %ERRORLEVEL% NEQ 0 goto error

:deploy
".\WinSCP\WinSCP.exe" /console /script=deploy-preprod.txt /log=deploy-preprod.log
IF ERRORLEVEL 1 GOTO error
goto ok

:error
Echo !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
Echo Une erreur s'est produite, veuillez consulter le log.
Echo !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
goto end

:ok
Echo ----------------
Echo Publication fini
Echo ----------------

:end
pause
