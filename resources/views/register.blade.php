<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar</title>
</head>
<body>
    <form action="" method="post">
        @csrf
        <input type="text" name="name">
        @error('name')
        {{ $message }}
        @enderror

        <input type="email" name="email" id="">
        @error('email')
        {{ $message }}
        @enderror

        <input type="password" name="password" id="">
        @error('password')
        {{ $message }}
        @enderror

        <button type="submit">Daftar</button>
    </form>
</body>
</html>