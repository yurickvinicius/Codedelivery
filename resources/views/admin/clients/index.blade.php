@extends('app')
@section('content')

    <div class="container">
        <h3>Clientes</h3>

        <a href="#" class="btn btn-default">Novo Produto</a>
        <br><br>

        <table class="table table-bordered">
            <thead>
            <tr>
                <th>ID</th>
                <th>User</th>
                <th>City</th>
                <th>State</th>
                <th>Ação</th>
            </tr>
            </thead>

            <tbody>
            @foreach($clients as $client)
                <tr>
                    <th>{{ $client->id }}</th>
                    <th></th>
                    <th>{{ $client->city }}</th>
                    <th>{{ $client->state }}</th>
                    <th>
                        <a href="#" class="btn btn-default btn-sm">
                            Editar
                        </a>
                        <a href="#" class="btn btn-default btn-sm">
                            Remover
                        </a>
                    </th>
                </tr>
            @endforeach
            </tbody>
        </table>

        {!! $clients->render() !!}

    </div>

@endsection