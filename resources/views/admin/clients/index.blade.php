@extends('app')
@section('content')

    <div class="container">
        <h3>Clientes</h3>

        <a href="{{ route('admin.clients.create') }}" class="btn btn-default">Novo Cliente</a>
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
                    <td>{{ $client->id }}</td>
                    <td>{{ $client->user->name }}</td>
                    <td>{{ $client->city }}</td>
                    <td>{{ $client->state }}</td>
                    <td>
                        <a href="{{ route('admin.clients.edit',['id'=>$client->id]) }}" class="btn btn-default btn-sm">
                            Editar
                        </a>
                        <a href="#" class="btn btn-default btn-sm">
                            Remover
                        </a>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>

        {!! $clients->render() !!}

    </div>

@endsection